import { Task } from './task';
import { Session } from './session';
import type { sessionTask } from './sessionTask';

import dayjs from 'dayjs';

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
  taskColors: string[];

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
    // Assigned according to the task's index in the task array: (taskIndex % taskColors.length)
    this.taskColors = ['#F9989F', '#FCCB8F', '#FAF096', '#C5F8C8', '#cee1fdff', '#e5c5f8ff'];

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
        barColor: string;
      }) => {
        // console.log(task);
        this.tasks.push(new Task({
          tid: task.tid,
          uid: task.uid,
          title: task.title,
          workDuration: task.workDuration,
          breakDuration: task.breakDuration,
          totalTime: task.totalTime,
          barColor: task.barColor
        }))
      })
    } else {
      // Create defaults.
      this.tasks = [
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Test 5/3 sec',
          workDuration: 5,
          breakDuration: 3,
          totalTime: 0,
          barColor: this.taskColors[0 % this.taskColors.length]
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Test 10/5 sec',
          workDuration: 10,
          breakDuration: 5,
          totalTime: 0,
          barColor: this.taskColors[1 % this.taskColors.length]
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Pomodoro (25/5)',
          workDuration: 1500,
          breakDuration: 300,
          totalTime: 0,
          barColor: this.taskColors[2 % this.taskColors.length]
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Pomodoro (30/10)',
          workDuration: 1800,
          breakDuration: 600,
          totalTime: 0,
          barColor: this.taskColors[3 % this.taskColors.length]
        }),
        new Task({
          tid: uuidv4(),
          uid: this.uid,
          title: 'Pomodoro (50/10)',
          workDuration: 3000,
          breakDuration: 600,
          totalTime: 0,
          barColor: this.taskColors[4 % this.taskColors.length]
        })
      ];
    }

    if (this.currentTask === '') {
      this.currentTask = this.tasks[0].tid;
    }

    // Do same as parsing the tasks like above to avoid some errors

    const sessionInfo = localStorage.getItem(this.#sessionLocalStorageKey);
    this.sessions = [];
    console.log(sessionInfo);

    if (sessionInfo) {
      // Must load them into new Session objects.
      JSON.parse(sessionInfo).forEach((session: {
        sid: string;
        uid: string;
        sessionTasks: sessionTask[]
        date: string;
        totalDuration: number;
      }) => {
        // console.log(task);
        this.sessions.push(new Session({
          sid: session.sid,
          uid: session.uid,
          sessionTasks: session.sessionTasks,
          date: session.date,
          totalDuration: session.totalDuration
        }))
      })
    } else {
      this.sessions.push( new Session({
        sid: uuidv4(),
        uid: this.uid,
        sessionTasks: [{
          tid: this.tasks[0].tid,
          title: this.tasks[0].title,
          duration: 5.5*3600,
          barColor: this.tasks[0].barColor,
        }, {
          tid: this.tasks[1].tid,
          title: this.tasks[1].title,
          duration: 3*3600,
          barColor: this.tasks[1].barColor,
        },
        ],
        date: (dayjs().subtract(0, 'days')).format('DD/MM/YYYY'),
        totalDuration: 8.5*3600
      }));
      this.sessions.push( new Session({
        sid: uuidv4(),
        uid: this.uid,
        sessionTasks: [{
          tid: this.tasks[0].tid,
          title: this.tasks[0].title,
          duration: 6*3600,
          barColor: this.tasks[0].barColor,
        }, {
          tid: this.tasks[2].tid,
          title: this.tasks[2].title,
          duration: 5*3600,
          barColor: this.tasks[2].barColor,
        },
        ],
        date: (dayjs().subtract(1, 'days')).format('DD/MM/YYYY'),
        totalDuration: 11*3600
      }));
      this.sessions.push( new Session({
        sid: uuidv4(),
        uid: this.uid,
        sessionTasks: [{
          tid: this.tasks[1].tid,
          title: this.tasks[1].title,
          duration: 3*3600,
          barColor: this.tasks[1].barColor,
        }],
        date: (dayjs().subtract(2, 'days')).format('DD/MM/YYYY'),
        totalDuration: 3*3600
      }));
      this.sessions.push( new Session({
        sid: uuidv4(),
        uid: this.uid,
        sessionTasks: [{
          tid: this.tasks[1].tid,
          title: this.tasks[1].title,
          duration: 3*3600,
          barColor: this.tasks[1].barColor,
        }],
        date: (dayjs().subtract(5, 'days')).format('DD/MM/YYYY'),
        totalDuration: 3*3600
      }));

    }

    // console.log(this.sessions);

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
      barColor: this.taskColors[(this.tasks.length + 1) % this.taskColors.length]
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

  updateSession(newSessionTaskDuration:number) {
    // Given current task, create or update a session, and sessionTasks within the session.
    // This function is called when: page unload (refresh, closed, browser previous page), 
    // timer pause/skip/reset, timer switch (user.setCurrent), timer switches between break/focus
    // i.e., whenever setTimeElapsed(0)

    // Convert from ms to sec (rounded down)
    // const hours:number = Number(Math.round((newSessionTaskDuration/1000)/3600).toFixed(2));
    const sec:number = Number(Math.round(newSessionTaskDuration/1000).toFixed(2));
    console.log(`updated to : ${sec} sec`);
    const currentTask:(Task | null) = this.getTask(this.currentTask);
    const today:string = dayjs().format('DD/MM/YYYY');

    if (!currentTask) {
      return;
    }

    // Most recent session is in index 0.
    // If most recent exists, then update taskSessions inside. Otherwise create new.
    // const currentSession:(Session | null) = this.getCurrentSession();
    if (this.sessions.length > 0) {
      if (this.sessions[0].date === today) {
        // Session exists, check to see if sessionTask exists for currentTask
        (currentTask as Task).totalTime += sec;
        
        // Loop through this.sessions[0].sessionTasks
          // If a sessionTask's tid === currentTask, then increase its duration and the task's totalTime by sec
          // save to storage
          // return

        for (let i = 0; i < this.sessions[0].sessionTasks.length; i++) {
          const st = this.sessions[0].sessionTasks[i];
          if (st.tid === currentTask['tid']) {
            console.log('Session exists, sessionTask exists')
            st.duration += sec;
            this.sessions[0].totalDuration += sec;
            // (currentTask as Task).totalTime += sec;
            this.saveToStorage();
            return;
          }
        }

        // this.sessions[0].sessionTasks.forEach((st) => {
        //   if (st.tid === currentTask['tid']) {
        //     console.log('Session exists, sessionTask exists')
        //     st.duration += sec;
        //     // (currentTask as Task).totalTime += sec;
        //     this.saveToStorage();
        //     return;
        //   }
        // })

        console.log('Session exists, sessionTask not found')

        // sessionTask was not found, create new one with tid===currentTask
        // Use sec for its duration and increase current task's totalTime by sec
        // save to storage
        // return
        this.sessions[0].totalDuration += sec;
        this.sessions[0].sessionTasks.push({
          tid: currentTask['tid'],
          title: currentTask['title'],
          duration: sec,
          barColor: currentTask['barColor']
        })

        this.saveToStorage();
        return;
      }
    }
    console.log('Session dont, sessionTask dont exist')
    // Session doesn't exist
    // Create new session with a sessionTask matching currentTask
      // Use sec for its duration and increase current task's totalTime by sec
    // prepend session to this.sessions 
    // save to storage
    this.sessions.unshift(new Session({
      sid: uuidv4(),
      uid: this.uid,
      sessionTasks: [{
        tid: currentTask['tid'],
        title: currentTask['title'],
        duration: sec,
        barColor: currentTask['barColor'],
      }],
      date: dayjs().format('DD/MM/YYYY'),
      totalDuration: sec
    }));

    this.saveToStorage();
  }
}


// export const tasks = new userInfo('user');
export const user = new User('localuser');