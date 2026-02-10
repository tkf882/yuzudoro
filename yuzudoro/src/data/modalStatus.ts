// 0: None (info: None)
// 1: New Task (info: None)
// 2: Edit Task (info: Task ID)
// 3: Warning Switch (info: Task ID)
// 4: Warning Edit (info: Task ID)
export interface modalStatus {
  type:number; 
  info:string;
}