export interface Assignment {
  _id: ID;
  name: string;
  version: number;
  cohortType: string[];
  cohortWeek: string;
  instructor: ID[];
  instructions: string;
  resourcesUrls: string[];
  topics: Topic[];
}

export interface Cohort {
  _id: ID;
  name: string;
  campus: string;
  students: [];
  instructors: [];
  startDate: Date;
  endDate: Date;
  instructorKey: KEY;
  studentKey: KEY;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface Deliverable {
  _id: ID;
  name: string;
  instructor: ID[];
  student: ID[] | User;
  cohort: ID[];
  instructions: string;
  resourcesUrls: string[];
  topics: Topic[];
  deadline: Date;
  turnedIn: Date | null;
  completed: Date | null;
  deliverable: string | null;
  grade: number | null;
}

export interface EditUserInfo {
  _id: ID;
  role: Role;
}

export interface GradeDeliverableInfo {
  deliverableId: ID;
  grade: number;
}

export type ID = string;

export type KEY = string;

export interface NewCohortInfo {
  name: string;
  campus: string; // Campus ID
  startDate: Date;
  endDate: Date;
}

export interface NewUserInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export interface NewAssignmentInfo {
  name: string;
  cohortType: string; // Input is comma separated list, parsed into string[]
  cohortWeek: string;
  instructions: string;
  resourcesUrls: string; // Input is a comma separated list, parsed into a string[]
  // topics: Topic[]; To be added in the future
}

export interface NewDeliverableInfo {
  assignmentId: ID;
  cohortId: ID;
  dueDate: Date;
}

export type Role = 'admin' | 'instructor' | 'student' | null;

export const roleOptions: Array<{ value: Role; label: string }> = [
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'instructor',
    label: 'Instructor',
  },
  {
    value: 'student',
    label: 'Student',
  },
];

export interface SignUpInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  cohortKey: string;
}

export interface Topic {
  question: string;
  numOfAnswers: number;
  answers: string[]; // user
}

export interface TurnInDeliverableInfo {
  deliverableId: ID;
  turnedIn: Date | null;
  deliverable: string | null;
}

export interface User {
  _id: ID;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  deliverables: ID[];
}
