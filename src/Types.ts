export interface Cohort {
  _id: ID;
  name: string;
  campus: string;
  students?: []; // This may be trouble
  instructors: [];
  startDate: Date;
  endDate: Date;
}

export interface User {
  _id: ID;
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: Role,
  deliverables: ID[],
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

export interface NewUserInfo {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role: Role,
}