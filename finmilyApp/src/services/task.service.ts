import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { HttpService } from './http.service';
import { IResultHttp } from 'src/interfaces/IResultHttp';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( public http: ApiService ) { }

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
