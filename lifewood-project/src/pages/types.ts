export type Position={
    id: number;
    title: string;
    description: string;
    status: string;
    is_archive: boolean;
}

export type Applicant = {
  id: number;
  fname: string;
  lname: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  resume: string | null;
}

export type Application ={
    id: string;
    date_submitted: string;
    pos_id: number;
    apl_id: number;
}

export type Admin = {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    auth_id: string;
}

export type ApplicationLog = {
    id: number;
    datetime: string;
    app_id: string;
    status: string; 
}


export type ApplicationFormData = {
    fname: string;      
    lname: string;      
    gender: string;
    dob: string;
    email: string;
    phone: string;
    address: string;
    country: string;    
    positions: string[];
    resumeFile: File | null;
}

export type ApplicationDetails={
  applicationId: string;
  dateSubmitted: string;
  status: string;
  applicant: {
    firstname: string;
    lastname: string;
    dob: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    resume: string | null;
  };
  position: {
    id: number;
    title: string;
    description: string;
  };
  logs: Array<{
    status: string;
    datetime: string;
  }>;
}