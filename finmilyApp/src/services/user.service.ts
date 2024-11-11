import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Constants } from 'src/shared/constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // BehaviorSubject para manter o perfil do usuário
  private userProfileSubject: BehaviorSubject<string | null>;
  public userProfile$: Observable<string | null>;

  constructor(
    public http: ApiService
  ) { 
    // Inicializa o BehaviorSubject com o perfil salvo no localStorage, se existir
    const savedProfile = localStorage.getItem(Constants.KeyStore.perfil);
    this.userProfileSubject = new BehaviorSubject<string | null>(savedProfile ? JSON.parse(savedProfile) : null);
    this.userProfile$ = this.userProfileSubject.asObservable();
  }

  async login(nickname: string, password: string) {
    try {
      const result = await this.http.post('/users/auth', { nickname, password });
      console.log('Result:', result);
      await this.saveDataLoginInfo(result.userAuth, result.token, result.userAuth.role);

      // this.http.userToken = result.token;

      return result;
    } catch(error) {
      console.log('Error:', error);
      return error;
    }
  }


  async saveDataLoginInfo(user: any, token: any, perfil: any) {
    localStorage.setItem(Constants.KeyStore.user, JSON.stringify(user));
    localStorage.setItem(Constants.KeyStore.perfil, JSON.stringify(perfil));
    localStorage.setItem(Constants.KeyStore.token, token);

    this.userProfileSubject.next(perfil);
  }

  // Método para limpar as informações ao fazer logout
  logout() {
    localStorage.removeItem(Constants.KeyStore.user);
    localStorage.removeItem(Constants.KeyStore.perfil);
    localStorage.removeItem(Constants.KeyStore.token);
    this.userProfileSubject.next(null); // Atualiza o perfil para null ao deslogar
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
