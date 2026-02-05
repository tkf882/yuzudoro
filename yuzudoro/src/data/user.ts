import { Task } from './task';
import { Session } from './session';

// https://www.geeksforgeeks.org/javascript/how-to-create-a-guid-uuid-in-javascript/
function uuidv4():string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  .replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, 
          v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

export class User {
  #localStorageKey: string; // localuser
  #tasksLocalStorageKey: string;
  #sessionLocalStorageKey: string;

  uid: string; // localuserId
  tasks: Task[];
  sessions: Session[];

  currentTask: string;

  constructor(localStorageKey:string) {
    this.#localStorageKey = localStorageKey;

    const info = localStorage.getItem(this.#localStorageKey);

    /* See saveToStorage()
    info = {
      uid: "..."
      tasksLocalStorageKey: "...",
      sessionLocalStorageKey: "...",
      currentTask: "..."
    } */

    if (info) {
      console.log('OLD INFO FOUND')
      const infoParse = JSON.parse(info);
      this.uid = infoParse.uid;
      this.#tasksLocalStorageKey = infoParse.tasksLocalStorageKey;
      this.#sessionLocalStorageKey = infoParse.sessionLocalStorageKey;
      this.currentTask = infoParse.currentTask;
    } else {
      console.log('NEW')
      this.uid = 'localuserId'; // Manually set for version w/o accounts.
      this.#tasksLocalStorageKey = `${this.#localStorageKey}-tasks`
      this.#sessionLocalStorageKey = `${this.#localStorageKey}-sessions`
      this.currentTask = '';
    }

    // this.#loadFromStorage();
    const taskInfo = localStorage.getItem(this.#tasksLocalStorageKey);
    this.tasks = taskInfo ? JSON.parse(taskInfo) : [
      new Task({ // The default task
        tid: uuidv4(),
        uid: this.uid,
        title: 'Standard Pomodoro',
        workDuration: 1500,
        breakDuration: 300,
        totalTime: 0
      })
    ];
    if (this.currentTask === '') {
      this.currentTask = this.tasks[0].tid;
    }

    const sessionInfo = localStorage.getItem(this.#sessionLocalStorageKey);
    this.sessions = sessionInfo ? JSON.parse(sessionInfo) : [];
  }

  saveToStorage() {
    // Note: Saving a list of class instances into a JSON file will only save the properties (No class methods)

    // save tasks
    localStorage.setItem(this.#tasksLocalStorageKey, JSON.stringify(this.tasks));
    // save sessions
    localStorage.setItem(this.#sessionLocalStorageKey, JSON.stringify(this.sessions));
    // save user
    localStorage.setItem(this.#localStorageKey, JSON.stringify({
      uid: this.uid,
      tasksLocalStorageKey: this.#tasksLocalStorageKey,
      sessionLocalStorageKey: this.#sessionLocalStorageKey,
      currentTask: this.currentTask
    }));
  }

  addTask(title:string, workDuration:number, breakDuration:number) {
    this.tasks.push(new Task({
      tid: uuidv4(),
      uid: this.uid,
      title: title,
      workDuration: workDuration,
      breakDuration: breakDuration,
      totalTime: 0,
    }));
    this.saveToStorage();
  }

  getTask(tid:string) {
    let matchingTask = null;
    this.tasks.forEach((task) => {
      if (task.tid === tid) {
        matchingTask = task;
      }
    })
    return matchingTask;
  }

  setCurrent(tid:string) {
    this.currentTask = tid;
    this.saveToStorage();
  }
  
  editTask(tid:string, newTitle:string, workDuration:number, breakDuration:number) {
    const current:(Task | null) = this.getTask(tid);
    if (current) {
      (current as Task).setTitle(newTitle); // avoid [property does not exist on type 'never']. At this point it is NOT null
      (current as Task).setWorkDuration(workDuration);
      (current as Task).setBreakDuration(breakDuration);
    }
    this.saveToStorage();
  }

}


// export const tasks = new userInfo('user');
export const user = new User('localuser');