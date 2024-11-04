import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from 'src/app/base/base.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( public http: ApiService ) { }

  async GetData() {
    const result = await this.http.get(`/manager/home`);
    return result;
  }

}
