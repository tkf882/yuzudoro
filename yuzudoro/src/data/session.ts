export class Session {
  id: string;
  uid: string;
  tid: string;
  duration: number;
  date: string;

  constructor(details: {
    id: string;
    uid: string;
    tid: string;
    duration: number;
    date: string;
  }
  ) {
    this.id = details.id;
    this.uid = details.uid;
    this.tid = details.tid;
    this.duration = details.duration;
    this.date = details.date;
  }
}