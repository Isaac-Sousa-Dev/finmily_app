import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildrenService {

  constructor(
    private http: ApiService
  ) { }

  async getAllChildrensByParent() {
    const result = await this.http.get(`/manager/childrens`);
    return result.data;
  }
}
