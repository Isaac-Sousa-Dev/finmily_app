import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ChildrenService } from 'src/services/children.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.scss'],
})
export class EditTaskModalComponent  implements OnInit {

  @Input() task: any;

  formData: any = {
    user: '',
    title: '',
    description: '',
    cost: '',
    daysOfWeek: [],
    daysOfWeekReverted: [],
    everyDay: false,
  }

  diaFrequencia: string = 'diaSemana';
  tipoTarefa: string = 'dinheiro';
  childrens: any = [];

  constructor(
    private childrenService: ChildrenService,
    private taskService: TaskService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.getChildrensByManager();
    this.formData = {
      title: this.task.title,
      description: this.task.description,
      cost: this.task.cost,
      daysOfWeek: this.task.daysOfWeek,
      daysOfWeekReverted: this.task.daysOfWeekReverted,
      user: this.task.user.uid
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tarefa cadastrada com sucesso!',
      duration: 4000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
  }

  async getChildrensByManager() {
    this.childrens = await this.childrenService.getAllChildrensByParent(); 
    console.log('Filhos', this.childrens);
  }

  async saveTask(event: any) {
    const taskData = { ...this.formData };

    if(this.diaFrequencia === 'diaSemana') {
      taskData.everyDay = false;
    } else {
      taskData.everyDay = true;
    }

    // Convertendo o array daysOfWeek para uma string separada por vírgulas
    if (Array.isArray(taskData.daysOfWeek)) {
      taskData.daysOfWeek = taskData.daysOfWeek.join(', ');
    }

    await this.taskService.SaveTask(taskData);

    this.modalController.dismiss();
    this.taskService.notifyTaskUpdated();
    this.presentToast();
  }
}
