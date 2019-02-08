export interface Cohort {
  id: ID;
  name: string;
  campus: string;
  students?: []; // This may be trouble
  instructors: [];
  startDate: Date;
  endDate: Date;
}

export type ID = string;

export type Role = 'admin' | 'instructor' | 'student' | null

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  cohortKey: string;
}

export interface NewCohortInfo {
  name: string;
  campus: string; // Campus ID
  startDate: Date;
  endDate: Date;
}
