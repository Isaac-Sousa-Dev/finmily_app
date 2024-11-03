import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../services/payment.service';
import { TarefasService } from '../services/tarefas.service';
import { Location } from '@angular/common';
import { ChildrenService } from 'src/services/children.service';
import { TaskService } from 'src/services/task.service';
import { ModalController } from '@ionic/angular';
import { CreateChildModalComponent } from 'src/components/modals/create-child-modal/create-child-modal.component';
import { EditChildModalComponent } from 'src/components/modals/edit-child-modal/edit-child-modal.component';

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

  constructor(
    private router: Router, 
    private location: Location,
    private childService: ChildrenService,
    private TaskService: TaskService,
    private modalController: ModalController
  ) { }


  async ngOnInit() {
    this.getChildrensByManager();
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
      initialBreakpoint: 0.75,
      breakpoints: [0.75, 0.75, 0.75, 0.75]
    }).then(modal => {
      modal.present();
    })
    console.log('openModalCreateChild');
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']); 
  }

  goBack() {
    this.location.back();
  }

}
