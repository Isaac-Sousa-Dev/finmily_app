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

  async saveChild(data: any) {
    const result = await this.http.post(`/collaborator/register`, data);
    return result.data;
  }

  async deleteChild(uid: string) {
    const result = await this.http.delete(`/collaborator/${uid}`);
    return result; 
  }
}
