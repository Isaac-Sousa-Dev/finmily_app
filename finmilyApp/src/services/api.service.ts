import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { lastValueFrom } from 'rxjs';
import { Constants } from 'src/shared/constants';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  urlBase: string = 'http://localhost:3000';
  // userToken: string = '';

  constructor(
    private http: HttpClient,
    private alertSrv: AlertService,
    private spinnerSrv: SpinnerService,
  ) { 
    // console.log(this.userToken, 'Token');
  }

  createHeader() {
    const token = localStorage.getItem(Constants.KeyStore.token);
    return{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }
  }

  async get(url: string): Promise<any> {
    try {
      await this.spinnerSrv.Show();
      const result = await lastValueFrom(this.http.get(`${this.urlBase}${url}`, this.createHeader()));
      this.spinnerSrv.Hide();
      return result;
    } catch (error) {
      this.spinnerSrv.Hide();
      console.error(error);
    }
  }

  async post(url: string, data: any): Promise<any> {
    const result = await this.http.post(`${this.urlBase}${url}`, data, this.createHeader()).toPromise();
    return result;
  }

  async put(url: string, data: any): Promise<any> {
    const result = await this.http.put(`${this.urlBase}${url}`, data, this.createHeader()).toPromise();
    return result;
  }

  async delete(url: string): Promise<any> {
    const result = await this.http.delete(`${this.urlBase}${url}`, this.createHeader()).toPromise();
    return result;
  } 
}
