import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    public http: ApiService
  ) { }

  async login(nickname: string, password: string) {
    try {
      const result = await this.http.post('/users/auth', { nickname, password });
      return result;
    } catch(error) {
      console.log('Error:', error);
      return error;
    }
  }

}
