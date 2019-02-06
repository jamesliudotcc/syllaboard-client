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
