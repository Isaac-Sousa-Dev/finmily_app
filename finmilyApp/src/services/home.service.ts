import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from 'src/app/base/base.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService<any> {

  constructor(
    override http: HttpService
  ) { 
    super('manager/home', http);  
  }
}
