import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { TarefasService } from '../services/tarefas.service';
import { Location } from '@angular/common';
import { ChildrenService } from 'src/services/children.service';
import { TaskService } from 'src/services/task.service';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CreateChildModalComponent } from 'src/components/modals/create-child-modal/create-child-modal.component';
import { EditChildModalComponent } from 'src/components/modals/edit-child-modal/edit-child-modal.component';
import { ChildrensPageMock } from 'src/mocks/ChildrensPage';

@Component({
  selector: 'app-filhos',
  templateUrl: './filhos.page.html',
  styleUrls: ['./filhos.page.scss'],
})
export class FilhosPage implements OnInit {

  paymentService = new PaymentService();
  tarefasService = new TarefasService();

  allTasks: any = [];
  childrens: any;
  totalPaymentByMonth: number = 0;


  childrensMock = new ChildrensPageMock().data;

  constructor(
    private router: Router, 
    private location: Location,
    private childService: ChildrenService,
    private TaskService: TaskService,
    private modalController: ModalController,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }


  async ngOnInit() {
    // Inscreva-se para escutar a criação de novos filhos
    // this.childService.childrenUpdated$.subscribe(() => {
    //   this.getChildrensByManager(); // Atualize os dados
    // });

    this.childrens = this.childrensMock.data;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
  }

  async getChildrensByManager() {
    this.childrens = await this.childService.getAllChildrensByParent(); 
    this.GetTasksOpenByManager();
  }

  async GetTasksOpenByManager(){
    this.allTasks = await this.TaskService.GetTasksOpenByManager();
    this.totalPaymentByMonth = this.paymentService.getTotalPaymentByMonth(this.allTasks.tasks);
  }

  async openModalEditChild(child: any) {
    this.modalController.create({
      component: EditChildModalComponent,
      cssClass: 'create-child-modal',
      initialBreakpoint: 0.63,
      breakpoints: [0.63, 0.63, 0.63, 0.63],
      componentProps: {
        child: child
      }
    }).then(modal => {
      modal.present();
    });
  }


  async confirmDelete(child: any) {
    const alert = await this.alertController.create({
      header: 'Excluir Pessoa',
      message: `Tem certeza que deseja excluir essa pessoa "${child.nickname}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Excluir',
          role: 'confirm',
          handler: () => {
            this.deleteChild(child);
          } 
        },
      ],
    });
    await alert.present();
  }

  async deleteChild(child: any) {
    await this.childService.deleteChild(child.uid);
    this.childService.notifyChildrenUpdated();
    
    setTimeout(() => {
      this.presentToast('Pessoa deletada com sucesso!');
      this.TaskService.notifyTaskUpdated();
    }, 300);
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']); 
  }

  goBack() {
    this.location.back();
  }

}
