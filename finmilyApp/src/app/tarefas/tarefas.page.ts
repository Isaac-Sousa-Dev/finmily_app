import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskService } from 'src/services/task.service';
import { SpinnerService } from 'src/services/spinner.service';
import { HttpService } from 'src/services/http.service';

interface Task {
  title: string;
  description: string;
  cost: number;
  user: {
    nickname: string;
  };
  daysOfWeek: string | null;
  everyDay: boolean;  
  // Adicione outros campos relevantes aqui
}

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {
  data: any;
  allTasks: Task[] = [];
  totalPaymentByMonth = 0;

  paymentService = new PaymentService();

  constructor(
    private router: Router,
    private location: Location,
    private taskService: TaskService,
    // private paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.getTasksOpenByManager();
  }

  async getTasksOpenByManager() {
    try {
      const response = await this.taskService.GetTasksOpenByManager();
      this.allTasks = response.tasks.map((task: Task) => ({
        ...task,
        daysOfWeek: task.daysOfWeek ? this.formatDaysOfWeek(task.daysOfWeek) : []
      }));
      this.totalPaymentByMonth = this.paymentService.getTotalPaymentByMonth(this.allTasks);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }

  private formatDaysOfWeek(daysOfWeek: any) {
    let arrayDaysFormatted: any = [];
    daysOfWeek = daysOfWeek.split(',');
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    daysOfWeek.map((day: any) => {
      day = day.trim();
      // day = dayNames[day];
      arrayDaysFormatted.push(dayNames[day]);
    });

    return arrayDaysFormatted;
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }

  goBack() {
    this.location.back();
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
}
