export interface Cohort {
  _id: ID;
  name: string;
  campus: string;
  students: []; // This may be trouble
  instructors: [];
  startDate: Date;
  endDate: Date;
  instructorKey: KEY;
  studentKey: KEY;
}

export interface Assignment {
  _id: ID;
  name: string;
  version: number;
  cohortType: string[]; // Refs cohort
  cohortWeek: string; // When should this be assigned
  instructor: ID[]; // Who does this belong to? Instructor can filter for own and other instructors' materials
  instructions: string; // this is the instructor’s notes on what should be accomplished.
  resourcesUrls: string[]; // optional
  topics: Topic[];
}

export interface Deliverable {
  _id: ID;
  name: string;
  instructor: ID[];
  student: ID[];
  cohort: ID[];
  instructions: string; // this is the instructor’s notes on what should be accomplished.
  resourcesUrls: string[]; // optional
  topics: Topic[];
  deadline: Date;
  turnedIn: Date | null; // Maybe just a Boolean?
  completed: Date | null; // Date indicates acceptance of assignment
  deliverable: string | null; // URL to deliverable, Google Doc, or whatever.
  grade: number | null; // 1-3 usually around 2.1-2.6
}

export interface Topic {
  question: string;
  numOfAnswers: number;
  answers: string[]; // user
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

export type KEY = string;

export type ID = string;

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

export interface EditUserInfo {
  _id: ID,
  role: Role,
}

export interface NewAssignmentInfo {
  name: string;
  // version: number;
  cohortType: string[]; // Refs cohort
  cohortWeek: string; // When should this be assigned
  // instructor: ID[]; // Who does this belong to? Instructor can filter for own and other instructors' materials
  instructions: string; // this is the instructor’s notes on what should be accomplished.
  resourcesUrls: string[]; // optional
  // topics: Topic[];
}

export interface TurnInDeliverable {
  deliverableId: ID;
  turnedIn: Date | null;
  deliverable: string | null;
}

export interface NewDeliverableInfo {
  name: string;
  instructor: ID[];
  student: ID[];
  cohort: ID[];
  instructions: string; // this is the instructor’s notes on what should be accomplished.
  resourcesUrls: string[]; // optional
  topics: Topic[];
  deadline: Date;
  turnedIn: Date | null; // Maybe just a Boolean?
  completed: Date | null; // Date indicates acceptance of assignment
  deliverable: string | null; // URL to deliverable, Google Doc, or whatever.
  grade: number | null; // 1-3 usually around 2.1-2.6
}
