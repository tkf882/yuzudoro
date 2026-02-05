export class Task {
  tid: string;
  uid: string;
  title: string;
  workDuration: number;
  breakDuration: number;
  totalTime: number;

  constructor(details: {
    tid: string;
    uid: string;
    title: string;
    workDuration: number;
    breakDuration: number;
    totalTime: number;
  }
  ) {
    this.tid = details.tid;
    this.uid = details.uid;
    this.title = details.title;
    this.workDuration = details.workDuration;
    this.breakDuration = details.breakDuration;
    this.totalTime = details.totalTime;
  }

  setTitle(newTitle:string) {
    this.title = newTitle;
  }

  setWorkDuration(newWorkDuration:number) {
    this.workDuration = newWorkDuration;
  }

  setBreakDuration(newBreakDuration:number) {
    this.breakDuration = newBreakDuration;
  }

}

// export interface Task {
//   tid: string;
//   uid: string;
//   title: string;
//   workDuration: number;
//   breakDuration: number;
//   totalTime: number;
// }