import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { AlertController, InfiniteScrollCustomEvent, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { TaskService } from 'src/services/task.service';

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

  taskForDeleted = '';
  selectedTask: Task | null = null;

  paymentService = new PaymentService();

  constructor(
    private router: Router,
    private location: Location,
    private taskService: TaskService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getTasksOpenByManager();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa removida com sucesso!',
      duration: 5000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
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
      arrayDaysFormatted.push(dayNames[day]);
    });

    return arrayDaysFormatted;
  }


  async confirmDelete(task: Task, slidingItem: any) {
    const alert = await this.alertController.create({
      header: 'Excluir Tarefa',
      message: `Tem certeza que deseja excluir a tarefa "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'confirm',
          handler: () => {
            this.deleteTask(task);
            slidingItem.close();
            this.presentToast();
          } 
        },
      ],
    });
    await alert.present();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.uid).then(() => {
      this.getTasksOpenByManager();
    })
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
