import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Constants } from 'src/shared/constants';

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
      console.log('Result:', result);
      return result;
    } catch(error) {
      console.log('Error:', error);
      return error;
    }
  }


  saveDataLoginInfo(user: any, token: any, perfil: any) {
    localStorage.setItem(Constants.KeyStore.user, JSON.stringify(user));
    localStorage.setItem(Constants.KeyStore.perfil, JSON.stringify(perfil));
    localStorage.setItem(Constants.KeyStore.token, token);
  }

  get userData() {
    try {
      const saved = localStorage.getItem(Constants.KeyStore.user);
      if(saved) {
        return JSON.parse(saved);
      } else {
        return null;
      }
    }catch(error) {
      console.log('Error:', error);
      return null;
    }
  }

}
