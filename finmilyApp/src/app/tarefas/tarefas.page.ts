import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskService } from 'src/services/task.service';
import { SpinnerService } from 'src/services/spinner.service';
import { HttpService } from 'src/services/http.service';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  paymentService = new PaymentService(); 

  allTasks: any = []; 
  totalPaymentByMonth: number = 0;

  constructor(
    private router: Router, 
    private location: Location,
    private TaskService: TaskService,
    private spinnerSrv: SpinnerService,
    public http: HttpService
  ) { }

  ngOnInit() {
    this.GetTasksOpenByManager();
  }


  async GetTasksOpenByManager(): Promise<void> {
    try {
      await this.spinnerSrv.Show();
      const result = await this.http.get(`http://localhost:3000/manager/tasks/`);
      this.allTasks = result.data.data;
      this.allTasks.tasks.forEach((task: any) => {
        if(task.daysOfWeek != null) {
          task.daysOfWeek = task.daysOfWeek.split(',');
        }
      });
      this.totalPaymentByMonth = this.paymentService.getTotalPaymentByMonth(this.allTasks.tasks);
      this.spinnerSrv.Hide();
    } catch (error) {
      this.spinnerSrv.Hide();
      console.log(error);
    }
  }



  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']); 
  }

  goBack() {
    this.location.back();
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
