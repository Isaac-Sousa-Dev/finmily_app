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
    console.log(uid, 'UID');
    const result = await this.http.get(`/manager/tasks-by-collaborator/${uid}`);
    return result.data;
  }
}
