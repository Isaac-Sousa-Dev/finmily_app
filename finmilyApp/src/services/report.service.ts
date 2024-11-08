import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( public http: ApiService ) { }

  private reportUpdatedSource = new BehaviorSubject<void | null>(null);
  reportUpdated$ = this.reportUpdatedSource.asObservable();

  notifyTaskUpdated() {
    this.reportUpdatedSource.next();
  } 

  async getMonthlyReport(uid: string | null) {
    const result = await this.http.get(`/report/${uid}`);
    return result;
  }

}
