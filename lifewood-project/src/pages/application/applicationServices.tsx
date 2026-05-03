import { supabase } from '../../lib/supabase';
import type { ApplicationFormData, ApplicationDetails } from '../types';

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

export async function submitApplication(formData: ApplicationFormData) {
  // STEP 1: Upload resume to bucket FIRST
  if (!formData.resumeFile) {
    throw new Error('Resume is required');
  }
  
  let resumeUrl: string;
  try {
    resumeUrl = await uploadResume(formData.resumeFile);
  } catch (error) {
    throw new Error('Failed to upload resume. Please try again.');
  }
  
  // STEP 2: Insert applicant with the resume URL
  const { data: applicantData, error: applicantError } = await supabase
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
  
  // STEP 3: Check database once to get the next counter
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
  
  // Generate all application IDs based on number of positions
  const applications = [];
  const applicationLogs = [];
  const currentDateTime = new Date().toISOString();
  
  for (let i = 0; i < formData.positions.length; i++) {
    const positionTitle = formData.positions[i];
    
    // Get position ID from title
    const { data: positionData, error: positionError } = await supabase
      .from('position')
      .select('id')
      .eq('title', positionTitle)
      .single();
    
    if (positionError) {
      continue;
    }
    
    // Generate unique application ID
    const counter = String(startCounter + i).padStart(3, '0');
    const applicationId = `${baseId}-${counter}`;
    
    applications.push({
      id: applicationId,
      date_submitted: currentDateTime,
      pos_id: positionData.id,
      apl_id: applicantData.id
    });
    
    applicationLogs.push({
      datetime: currentDateTime,
      app_id: applicationId,
      status: 'Pending'
    });
  }

  if (applications.length === 0) {
    throw new Error('No valid positions found');
  }

  // Insert all applications
  const { error: applicationError } = await supabase
    .from('application')
    .insert(applications);

  if (applicationError) {
    throw new Error('Failed to save applications');
  }

  // Insert all application logs
  const { error: _logsError } = await supabase
    .from('application_log')
    .insert(applicationLogs);

  return { 
    success: true, 
    applicantId: applicantData.id, 
    applicationIds: applications.map(app => app.id),
    resumeUrl 
  };
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
      throw new Error('Application ID not found');
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