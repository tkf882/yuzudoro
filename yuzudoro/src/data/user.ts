import { Task } from './task';
import { Session } from './session';

// https://www.geeksforgeeks.org/javascript/how-to-create-a-guid-uuid-in-javascript/
function uuidv4(): string {
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
  darkmode: boolean;

  constructor(localStorageKey: string) {
    this.#localStorageKey = localStorageKey;

    const info = localStorage.getItem(this.#localStorageKey);

    /* See saveToStorage()
    info = {
      uid: "..."
      tasksLocalStorageKey: "...",
      sessionLocalStorageKey: "...",
      currentTask: "..."
      darkmode: "..."
    } */

    if (info) {
      console.log('OLD INFO FOUND')
      const infoParse = JSON.parse(info);
      this.uid = infoParse.uid;
      this.#tasksLocalStorageKey = infoParse.tasksLocalStorageKey;
      this.#sessionLocalStorageKey = infoParse.sessionLocalStorageKey;
      this.currentTask = infoParse.currentTask;
      this.darkmode = infoParse.darkmode;
    } else {
      console.log('NEW')
      this.uid = 'localuserId'; // Manually set for version w/o accounts.
      this.#tasksLocalStorageKey = `${this.#localStorageKey}-tasks`
      this.#sessionLocalStorageKey = `${this.#localStorageKey}-sessions`
      this.currentTask = '';
      this.darkmode = false;
    }

    // this.#loadFromStorage();
    const taskInfo = localStorage.getItem(this.#tasksLocalStorageKey);

    // console.log(taskInfo);

    this.tasks = [];

    if (taskInfo) {
      // Must load them into new Task objects.
      JSON.parse(taskInfo).forEach((task: {
        tid: string;
        uid: string;
        title: string;
        workDuration: number;
        breakDuration: number;
        totalTime: number;
      }) => {
        // console.log(task);
        this.tasks.push(new Task({
          tid: task.tid,
          uid: task.uid,
          title: task.title,
          workDuration: task.workDuration,
          breakDuration: task.breakDuration,
          totalTime: task.totalTime
        }))
      })
    } else {
      this.tasks = [ // The default tasks
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Test 5/3 sec',
          workDuration: 5,
          breakDuration: 3,
          totalTime: 0
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Test 10/5 sec',
          workDuration: 10,
          breakDuration: 5,
          totalTime: 0
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Pomodoro (25/5)',
          workDuration: 1500,
          breakDuration: 300,
          totalTime: 0
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Pomodoro (30/10)',
          workDuration: 1800,
          breakDuration: 600,
          totalTime: 0
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Pomodoro (50/10)',
          workDuration: 3000,
          breakDuration: 600,
          totalTime: 0
        })
      ];
    }

    if (this.currentTask === '') {
      this.currentTask = this.tasks[0].tid;
    }

    // Do same as parsing the tasks like above to avoid some errors

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
      currentTask: this.currentTask,
      darkmode: this.darkmode
    }));
  }

  addTask(title: string, workDuration: number, breakDuration: number) {
    const newTask = new Task({
      tid: uuidv4(),
      uid: this.uid,
      title: title,
      workDuration: workDuration,
      breakDuration: breakDuration,
      totalTime: 0,
    })
    this.tasks.push(newTask);
    this.saveToStorage();
  }

  getTask(tid: string) {
    let matchingTask = null;
    this.tasks.forEach((task) => {
      if (task.tid === tid) {
        matchingTask = task;
      }
    })
    return matchingTask;
  }

  setCurrent(tid: string) {
    this.currentTask = tid;
    this.saveToStorage();
  }

  toggleDarkmode() {
    this.darkmode = !this.darkmode;
    this.saveToStorage();
  }

  editTask(tid: string, newTitle: string, workDuration: number, breakDuration: number) {
    const current: (Task | null) = this.getTask(tid);
    if (current) {
      console.log(current);
      (current as Task).setTitle(newTitle); // avoid [property does not exist on type 'never']. At this point it is NOT null
      (current as Task).setWorkDuration(workDuration);
      (current as Task).setBreakDuration(breakDuration);
    }
    this.saveToStorage();
  }
}


// export const tasks = new userInfo('user');
export const user = new User('localuser');