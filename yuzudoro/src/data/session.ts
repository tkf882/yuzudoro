import type { sessionTask } from './sessionTask';

// Session: Holds collection of tasks focused on a particular day
// The user has a list of sessions
export class Session {
  sid: string;
  uid: string;
  sessionTasks: sessionTask[]
  date: string; // DD/MM/YYY format.

  constructor(details: {
    sid: string;
    uid: string;
    sessionTasks: sessionTask[]
    date: string;
  }) {
    this.sid = details.sid;
    this.uid = details.uid;
    this.sessionTasks = details.sessionTasks;
    this.date = details.date;
  }

  
}