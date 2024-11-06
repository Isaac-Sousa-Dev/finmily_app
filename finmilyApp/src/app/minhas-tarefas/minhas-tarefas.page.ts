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
  status: string;
}
@Component({
  selector: 'app-minhas-tarefas',
  templateUrl: './minhas-tarefas.page.html',
  styleUrls: ['./minhas-tarefas.page.scss'],
})
export class MinhasTarefasPage implements OnInit {

  data: any;
  allTasks: Task[] = [];
  tasksToday: Task[] = [];
  totalBalance = 0;
  taskStatus = 'hoje';
  tasksFiltered: Task[] = [];

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
    // Inscreva-se para escutar a criação de novas tarefas
    this.taskService.taskUpdated$.subscribe(() => {
      this.getMyTasks(); // Atualize os dados
    });
  }

  async undoTask(task: any){
    console.log('Desfazendo Task', task);
  }

  async completeTask(task: any){
    console.log('Completando Task', task);
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

  async getMyTasks() {
    try {
      const response = await this.taskService.MyTasks();
      this.tasksFiltered = response.taskToday.map((task: Task) => ({
        ...task,
        daysOfWeek: task.daysOfWeek ? this.formatDaysOfWeek(task.daysOfWeek) : []
      }));
      this.allTasks = response.tasks.map((task: Task) => ({
        ...task,
        daysOfWeek: task.daysOfWeek ? this.formatDaysOfWeek(task.daysOfWeek) : []
      }));
      this.tasksToday = response.taskToday;
      this.totalBalance = response.userInfo.balance;
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

    console.log('daysOfWeek', arrayDaysFormatted);

    return arrayDaysFormatted;
  }


  async filterTasksByStatus(event: any) {
    const value = event.target.value;
    this.taskStatus = value;

    if (this.taskStatus === 'todas') {
      this.tasksFiltered = this.allTasks;
    } else if (this.taskStatus === 'hoje') {
      this.tasksFiltered = this.tasksToday;
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
