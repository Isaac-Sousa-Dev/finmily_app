import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { SpinnerService } from './spinner.service';
import { IResultHttp } from 'src/interfaces/IResultHttp';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private alertSrv: AlertService,
    private spinnerSrv: SpinnerService
  ) { }

  private createHeader(header?: HttpHeaders): HttpHeaders {
    if(!header) {
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    return header;
  }

  public get(url: string): Promise<IResultHttp> {
    console.log('url', url);
    const header = this.createHeader();

    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.get(url, {headers: header}).toPromise();
        resolve({success: true, error: null, data: res});
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({success: false, error: error, data: null});
      }
    })
  }


  public post(url: string, model: any, headers?: HttpHeaders): Promise<IResultHttp> {
    const header = this.createHeader(headers);

    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.post(url, model, {headers: header}).toPromise();
        resolve({success: true, error: null, data: res});
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({success: false, error, data: null});
      }
    })
  }


  public delete(url: string): Promise<IResultHttp> {
    const header = this.createHeader();

    return new Promise(async (resolve) => {
      try {
        await this.spinnerSrv.Show();
        const res = await this.http.delete(url, {headers: header}).toPromise();
        resolve({success: true, error: null, data: res});
        await this.spinnerSrv.Hide();
      } catch (error) {
        await this.spinnerSrv.Hide();
        resolve({success: false, error, data: null});
      }
    })
  }
}
