export class Task {
  tid: string;
  uid: string;
  title: string;
  workDuration: number;
  breakDuration: number;
  totalTime: number;
  barColor: string;
  canBeModified: boolean;

  constructor(details: {
    tid: string;
    uid: string;
    title: string;
    workDuration: number;
    breakDuration: number;
    totalTime: number;
    barColor: string;
    canBeModified: boolean;
  }
  ) {
    this.tid = details.tid;
    this.uid = details.uid;
    this.title = details.title;
    this.workDuration = details.workDuration;
    this.breakDuration = details.breakDuration;
    this.totalTime = details.totalTime;
    this.barColor = details.barColor;
    this.canBeModified = details.canBeModified;
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