import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TaskService } from 'src/services/task.service';
import { InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { ReportService } from 'src/services/report.service';

interface Task {
  uid: string;
  title: string;
  description: string;
  cost: number;
  user: {
    nickname: string;
  };
  daysOfWeek: string | null;
  everyDay: boolean;  
  status: string;
}

@Component({
  standalone: false,  
  selector: 'app-meus-ganhos',
  templateUrl: './meus-ganhos.page.html',
  styleUrls: ['./meus-ganhos.page.scss'],
})
export class MeusGanhosPage implements OnInit {

  data: any;
  allTasks: Task[] = [];
  tasksToday: Task[] = [];
  totalBalance = 0;
  taskStatus = 'hoje';
  tasksFiltered: Task[] = [];

  taskForDeleted = '';
  selectedTask: Task | null = null;

  reports: any[] = [];
  totalAcumulated = 0;

  paymentService = new PaymentService();

  constructor(
    private router: Router,
    private location: Location,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    // Inscreva-se para escutar a criação de novas tarefas
    this.reportService.reportUpdated$.subscribe(() => {
      this.getMonthlyReport(); // Atualize os dados
    });
  }



  async getMonthlyReport() {
    try {
      // TODO: Substituir pelo id do usuário autenticado
      const response = await this.reportService.getMonthlyReport('ff67aa8f-9459-4b61-8c94-572302561559');
      this.reports = response.report;

      this.reports.forEach((report: any) => {
        let balance = parseFloat(report.balance);
        this.totalAcumulated += balance;
      });

      this.totalBalance = response.user[0].balance;
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
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
