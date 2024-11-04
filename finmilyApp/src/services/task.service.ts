import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( public http: ApiService ) { }

  private taskUpdatedSource = new BehaviorSubject<void | null>(null);
  taskUpdated$ = this.taskUpdatedSource.asObservable();

  notifyTaskUpdated() {
    this.taskUpdatedSource.next();
  } 

  async GetTasksOpenByManager() {
    const result = await this.http.get(`/manager/tasks`);
    return result.data;
  }

  async GetTasksByChild(uid: string | null) {
    const result = await this.http.get(`/manager/tasks-by-collaborator/${uid}`);
    return result.data;
  }

  async SaveTask(taskData: any) {
    const result = await this.http.post(`/task`, taskData);
    return result;
  }

  async deleteTask(uid: string) {
    const result = await this.http.delete(`/task/${uid}`);
    return result;
  }
}
