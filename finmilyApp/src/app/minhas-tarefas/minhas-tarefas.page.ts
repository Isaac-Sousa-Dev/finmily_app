import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Router } from '@angular/router';
import { TaskService } from 'src/services/task.service';
import { AlertController, InfiniteScrollCustomEvent, ModalController, ToastController } from '@ionic/angular';
import { EditTaskModalComponent } from 'src/components/modals/edit-task-modal/edit-task-modal.component';
import { Location } from '@angular/common';

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
  selector: 'app-minhas-tarefas',
  templateUrl: './minhas-tarefas.page.html',
  styleUrls: ['./minhas-tarefas.page.scss'],
})
export class MinhasTarefasPage implements OnInit {

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
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // this.getTasksOpenByManager();

    // Inscreva-se para escutar a criação de novas tarefas
    this.taskService.taskUpdated$.subscribe(() => {
      this.getTasksOpenByManager(); // Atualize os dados
    });
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

  async openModalEditTask(task: any, slidingItem: any) {
    // slidingItem.close();
    await this.modalController.create({
      component: EditTaskModalComponent,
      cssClass: 'create-child-modal',
      initialBreakpoint: 0.95,
      breakpoints: [0.95, 0.95, 0.95, 0.95],
      componentProps: {
        task: task
      }
    }).then(modal => {
      modal.present();
    });
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
