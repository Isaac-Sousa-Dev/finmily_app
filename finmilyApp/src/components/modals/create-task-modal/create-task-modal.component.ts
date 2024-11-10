import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ChildrenService } from 'src/services/children.service';
import { TaskService } from 'src/services/task.service';
import Inputmask from 'inputmask';

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
})
export class CreateTaskModalComponent  implements OnInit {

  @ViewChild('inputMoney', { static: false }) inputMoney!: ElementRef;

  formData = {
    user: '',
    title: '',
    description: '',
    cost: '',
    daysOfWeek: '',
    status: 'pending',
    deleted: false,
    active: true,
    happiness: 0,
    everyDay: false,
  }

  diaFrequencia: string = 'diaSemana';
  tipoTarefa: string = 'dinheiro';
  childrens: any = [];

  constructor(
    private childrenService: ChildrenService,
    private taskService: TaskService,
    private modalController: ModalController,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.getChildrensByManager();
  }

  ionViewDidEnter() {
    const im = new Inputmask('currency', { prefix: 'R$ ', rightAlign: false });
    if (this.inputMoney) {
      im.mask(this.inputMoney.nativeElement);
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

  ngOnDestroy() {
    this.formData = {
      user: '',
      title: '',
      description: '',
      cost: '',
      daysOfWeek: '',
      status: 'pending',
      deleted: false,
      active: true,
      happiness: 0,
      everyDay: false,
    }
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
      taskData.daysOfWeek = taskData.daysOfWeek.join(',');
    }

    await this.taskService.SaveTask(taskData);

    this.modalController.dismiss();
    this.taskService.notifyTaskUpdated();
    this.presentToast();
  }

}
