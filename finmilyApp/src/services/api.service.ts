import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  urlBase: string = 'http://localhost:3000';  

  constructor(
    private http: HttpClient,
    private alertSrv: AlertService,
    private spinnerSrv: SpinnerService
  ) { }

  async get(url: string): Promise<any> {
    try {
      await this.spinnerSrv.Show();
      const result = await lastValueFrom(this.http.get(`${this.urlBase}${url}`));
      this.spinnerSrv.Hide();
      return result;
    } catch (error) {
      this.spinnerSrv.Hide();
      console.error(error);
    }
  }

  async post(url: string, data: any): Promise<any> {
    const result = await this.http.post(`${this.urlBase}${url}`, data).toPromise();
  }

  async delete(url: string): Promise<any> {
    const result = await this.http.delete(`${this.urlBase}${url}`).toPromise();
  } 
}
