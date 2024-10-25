import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { HttpService } from './http.service';
import { IResultHttp } from 'src/interfaces/IResultHttp';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlBase: string = 'localhost:3000'; 

  constructor( public http: HttpService, private spinnerSrv: SpinnerService ) { }

  async GetTasksOpenByManager() {
    try {
      await this.spinnerSrv.Show();
      const result = await this.http.get(`http://localhost:3000/manager/tasks/`);
      await this.spinnerSrv.Hide();
      return result.data;
    } catch (error) {
      await this.spinnerSrv.Hide();
      return error;
    }
  }
}
