import { supabase } from '../../lib/supabase';
import type { ApplicationFormData, ApplicationDetails, Position } from '../types';

//======================================================================
//                RESUME BUCKET UPLOAD
//======================================================================
export async function uploadResume(file: File): Promise<string> {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(7);
  const fileExt = file.name.split('.').pop();
  const fileName = `resume_${timestamp}_${randomString}.${fileExt}`;
  const filePath = `resume/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('lifewood')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw new Error(`Failed to upload resume: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('lifewood')
    .getPublicUrl(filePath);

  return publicUrl;
}


//======================================================================
//                APPLICATION SERVICES
//======================================================================
// Helper function to check if application is still active based on latest log
function isApplicationActive(status: string): boolean {
  const activeStatuses = ['pending', 'shortlisted', 'hired'];
  return activeStatuses.includes(status.toLowerCase());
}

// Get the current status of an application from its logs
async function getCurrentApplicationStatus(applicationId: string): Promise<string | null> {
  const { data: logs, error } = await supabase
    .from('application_log')
    .select('status')
    .eq('app_id', applicationId)
    .order('datetime', { ascending: false })
    .limit(1);

  if (error || !logs || logs.length === 0) {
    return null;
  }

  return logs[0].status;
}

export async function submitApplication(formData: ApplicationFormData) {
  // STEP 1: Validate required fields
  if (!formData.resumeFile) {
    throw new Error('Resume is required');
  }

  // STEP 2: Check if email already exists
  const { data: existingApplicant, error: existingError } = await supabase
    .from('applicant')
    .select('id, fname, lname, dob, email')
    .eq('email', formData.email)
    .maybeSingle();

  if (existingError) {
    throw new Error('Error checking existing applicant');
  }

  let applicantId: number;
  let isNewApplicant = false;
  let applicantNameMatch = true;
  let applicantDobMatch = true;

  if (existingApplicant) {
    // Email exists - verify name and DOB match
    const nameMatches = existingApplicant.fname.toLowerCase() === formData.fname.toLowerCase() &&
                       existingApplicant.lname.toLowerCase() === formData.lname.toLowerCase();
    const dobMatches = existingApplicant.dob === formData.dob;

    applicantNameMatch = nameMatches;
    applicantDobMatch = dobMatches;

    if (!nameMatches && !dobMatches) {
      throw new Error('This email is already used.');
    }
    applicantId = existingApplicant.id;
  } else {
    // New applicant - upload resume and create record
    isNewApplicant = true;
    
    let resumeUrl: string;
    try {
      resumeUrl = await uploadResume(formData.resumeFile);
    } catch (error) {
      throw new Error('Failed to upload resume. Please try again.');
    }

    const { data: newApplicant, error: applicantError } = await supabase
      .from('applicant')
      .insert({
        fname: formData.fname,
        lname: formData.lname,
        gender: formData.gender,
        dob: formData.dob,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        country: formData.country,
        resume: resumeUrl
      })
      .select()
      .single();

    if (applicantError) {
      throw new Error('Failed to save applicant data');
    }

    applicantId = newApplicant.id;
  }

  // STEP 3: Get existing applications for this applicant
  const { data: existingApplications, error: existingAppsError } = await supabase
    .from('application')
    .select(`
      id,
      pos_id,
      position:pos_id (
        id,
        title
      )
    `)
    .eq('apl_id', applicantId);

  if (existingAppsError) {
    throw new Error('Error checking existing applications');
  }

  // STEP 4: Get current status for each existing application from logs
  const applicationsWithStatus = await Promise.all(
    (existingApplications || []).map(async (app) => {
      const currentStatus = await getCurrentApplicationStatus(app.id);
      return {
        ...app,
        currentStatus: currentStatus?.toLowerCase() || 'pending'
      };
    })
  );

  // STEP 5: Get position IDs for requested positions
  const positionIdsMap = new Map<string, { id: number; title: string }>();
  for (const positionTitle of formData.positions) {
    const { data: positionData, error: positionError } = await supabase
      .from('position')
      .select('id, title')
      .eq('title', positionTitle)
      .single();
    
    if (positionError) {
      throw new Error(`Position "${positionTitle}" not found`);
    }
    positionIdsMap.set(positionTitle, { id: positionData.id, title: positionData.title });
  }

  // STEP 6: Validate each requested position against existing applications
  const conflictingPositions: string[] = [];
  const newApplications = [];

  for (const positionTitle of formData.positions) {
    const positionInfo = positionIdsMap.get(positionTitle);
    if (!positionInfo) continue;

    const existingApp = applicationsWithStatus.find(
      app => app.pos_id === positionInfo.id
    );

    if (existingApp) {
      const status = existingApp.currentStatus;
      if (isApplicationActive(status)) {
        conflictingPositions.push(`${positionInfo.title}`);
      } else {
        // Position exists but application is inactive (declined/not selected/withdrawn)
        // Allow reapplication
        newApplications.push({
          pos_id: positionInfo.id,
          title: positionInfo.title
        });
      }
    } else {
      // No existing application for this position
      newApplications.push({
        pos_id: positionInfo.id,
        title: positionInfo.title
      });
    }
  }

  // If there are conflicts, throw error
  if (conflictingPositions.length > 0) {
    throw new Error(`You already have active applications for: ${conflictingPositions.join(', ')}.`);
  }

  // If no new applications to add
  if (newApplications.length === 0) {
    throw new Error('All selected positions already have applications. No new applications were added.');
  }

  // STEP 7: Generate application IDs and insert
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear()).slice(-2);
  const datePrefix = `${day}${month}${year}`;
  const baseId = `APP${datePrefix}`;
  
  // Get the last application ID for today
  const { data: lastApp, error: lastAppError } = await supabase
    .from('application')
    .select('id')
    .ilike('id', `${baseId}-%`)
    .order('id', { ascending: false })
    .limit(1);
  
  let startCounter = 1;
  if (!lastAppError && lastApp && lastApp.length > 0) {
    const lastId = lastApp[0].id;
    startCounter = parseInt(lastId.split('-')[1]) + 1;
  }
  
  const applications = [];
  const applicationLogs = [];
  const currentDateTime = new Date().toISOString();
  
  for (let i = 0; i < newApplications.length; i++) {
    const app = newApplications[i];
    const counter = String(startCounter + i).padStart(3, '0');
    const applicationId = `${baseId}-${counter}`;
    
    applications.push({
      id: applicationId,
      date_submitted: currentDateTime,
      pos_id: app.pos_id,
      apl_id: applicantId
    });
    
    applicationLogs.push({
      datetime: currentDateTime,
      app_id: applicationId,
      status: 'Pending'
    });
  }

  // Insert all applications
  const { error: applicationError } = await supabase
    .from('application')
    .insert(applications);

  if (applicationError) {
    console.error('Application insert error:', applicationError);
    throw new Error('Failed to save applications');
  }

  // Insert all application logs
  const { error: logsError } = await supabase
    .from('application_log')
    .insert(applicationLogs);

  if (logsError) {
    console.error('Logs insert error:', logsError);
    // Don't throw here - applications were created successfully
  }

  return { 
    success: true, 
    applicantId: applicantId,
    isExistingApplicant: !isNewApplicant,
    applicationIds: applications.map(app => app.id),
    submittedPositions: newApplications.map((app, i) => ({
      title: app.title,
      id: applications[i].id
    })),
    newApplicationsCount: newApplications.length
  };
}

export async function sendApplicationConfirmation(
  applicantName: string,
  applicantEmail: string,
  positions: string[],
  applicationIds: string[]
) {
  try {
    await fetch('http://localhost:3001/api/application-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ applicantName, applicantEmail, positions, applicationIds }),
    });
  } catch (err) {
    console.warn('Confirmation email failed (non-critical):', err);
  }
}

// Get the current status of an application (most recent log)
export async function getApplicationCurrentStatus(applicationId: string): Promise<string> {
  const status = await getCurrentApplicationStatus(applicationId);
  return status || 'Pending';
}


export async function getApplicationDetails(applicationId: string) {
  // Step 1: Get the application record
  const { data: application, error: applicationError } = await supabase
    .from('application')
    .select('*')
    .eq('id', applicationId)
    .single();

  if (applicationError) {
    if (applicationError.code === 'PGRST116') {
      throw new Error('Application details not found');
    }
    throw new Error('Failed to fetch application details');
  }

  // Step 2: Get position details
  const { data: position, error: _positionError } = await supabase
    .from('position')
    .select('*')
    .eq('id', application.pos_id)
    .single();

  // Step 3: Get applicant details
  const { data: applicant, error: applicantError } = await supabase
    .from('applicant')
    .select('*')
    .eq('id', application.apl_id)
    .single();

  if (applicantError) {
    throw new Error('Applicant not found');
  }

  // Step 4: Get application logs
  const { data: logs, error: _logsError } = await supabase
    .from('application_log')
    .select('*')
    .eq('app_id', applicationId)
    .order('datetime', { ascending: true });

  // Format the response
  const formattedLogs = (logs || []).map(log => ({
    status: log.status,
    datetime: new Date(log.datetime).toLocaleString()
  }));

  // Determine current status
  let currentStatus = 'Pending';
  if (formattedLogs.length > 0) {
    currentStatus = formattedLogs[formattedLogs.length - 1].status;
  }

  return {
    applicationId: application.id,
    dateSubmitted: application.date_submitted,
    status: currentStatus,
    applicant: {
      firstname: applicant.fname,
      lastname: applicant.lname,
      dob: applicant.dob,
      gender: applicant.gender,
      email: applicant.email,
      phone: applicant.phone,
      address: applicant.address,
      country: applicant.country,
      resume: applicant.resume
    },
    position: {
      id: position?.id || 0,
      title: position?.title || '',
      description: position?.description || ''
    },
    logs: formattedLogs
  };
}

export async function fetchAllApplications(): Promise<ApplicationDetails[]> {
  const { data: applications, error: applicationsError } = await supabase
    .from('application')
    .select(`
      id,
      date_submitted,
      applicant:apl_id (
        id,
        fname,
        lname,
        gender,
        dob,
        email,
        phone,
        address,
        country,
        resume
      ),
      position:pos_id (
        id,
        title,
        description
      )
    `)
    .order('date_submitted', { ascending: false });

  if (applicationsError) {
    throw new Error('Failed to fetch applications');
  }

  // Process each application to get logs and format data
  const applicationsWithDetails = await Promise.all(
    (applications || []).map(async (app: any) => {
      // Fetch logs for this application
      const { data: logsData, error: _logsError } = await supabase
        .from('application_log')
        .select('*')
        .eq('app_id', app.id)
        .order('datetime', { ascending: true });

      // Handle applicant data (it might be an array from the join)
      const applicantData = Array.isArray(app.applicant) 
        ? app.applicant[0] 
        : app.applicant;

      // Handle position data (it might be an array from the join)
      const positionData = Array.isArray(app.position) 
        ? app.position[0] 
        : app.position;

      // Get current status from the latest log
      const logs = logsData || [];
      const currentStatus = logs.length > 0 
        ? logs[logs.length - 1].status 
        : 'Pending';

      // Format logs for display
      const formattedLogs = logs.map(log => ({
        status: log.status,
        datetime: log.datetime
      }));

      return {
        applicationId: app.id,
        dateSubmitted: app.date_submitted,
        status: currentStatus,
        applicant: {
          firstname: applicantData?.fname || '',
          lastname: applicantData?.lname || '',
          dob: applicantData?.dob || '',
          gender: applicantData?.gender || '',
          email: applicantData?.email || '',
          phone: applicantData?.phone || '',
          address: applicantData?.address || '',
          country: applicantData?.country || '',
          resume: applicantData?.resume || null
        },
        position: {
          id: positionData?.id || 0,
          title: positionData?.title || '',
          description: positionData?.description || ''
        },
        logs: formattedLogs
      };
    })
  );

  return applicationsWithDetails;
}

export async function updateApplicationStatus(applicationId: string, newStatus: string): Promise<void> {
  // Get the current datetime
  const currentDateTime = new Date().toISOString();
  
  // Insert new log entry
  const { error: logError } = await supabase
    .from('application_log')
    .insert({
      datetime: currentDateTime,
      app_id: applicationId,
      status: newStatus
    });

  if (logError) {
    throw new Error('Failed to update application status');
  }
  
  return;
}