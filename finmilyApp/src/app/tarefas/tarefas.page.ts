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

  data: any;
  allTasks: any = []; 
  totalPaymentByMonth: number = 0;

  constructor(
    private router: Router, 
    private location: Location,
    private TaskService: TaskService,
  ) { }

  ngOnInit() {
    this.GetTasksOpenByManager();
  }

  async GetTasksOpenByManager(){
    this.data = await this.TaskService.GetTasksOpenByManager();
    this.allTasks = this.data.tasks;
    this.allTasks.forEach((task: any) => {
      if(task.daysOfWeek != null) {

        switch (task.daysOfWeek) {
          case '0':
            task.daysOfWeek = 'Dom';
            break;
          case '1':
            task.daysOfWeek = 'Seg';
            break;
          case '2':
            task.daysOfWeek = 'Ter';
            break;
          case '3':
            task.daysOfWeek = 'Qua';
            break;
          case '4':
            task.daysOfWeek = 'Qui';
            break;
          case '5':
            task.daysOfWeek = 'Sex';
            break;
          case '6':
            task.daysOfWeek = 'Sáb';
            break;
          default:
            break;
        }

        task.daysOfWeek = task.daysOfWeek.split(',');
      }
    });
    this.totalPaymentByMonth = this.paymentService.getTotalPaymentByMonth(this.allTasks);
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
