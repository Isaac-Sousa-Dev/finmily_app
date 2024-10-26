import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent, IonModal } from '@ionic/angular';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';
import { ChildService } from '../services/child.service';
import { Location } from '@angular/common';
import { OverlayEventDetail } from '@ionic/core/components';

import { ModalController } from '@ionic/angular';
import { SimpleModalPage } from '../simple-modal/simple-modal.page';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-tarefas-filho',
  templateUrl: './tarefas-filho.page.html',
  styleUrls: ['./tarefas-filho.page.scss'],
})
export class TarefasFilhoPage implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal: IonModal = {} as IonModal;  
  nickname: string = '';

  tarefasService = new TarefasService();
  paymentService = new PaymentService(); 
  childService = new ChildService();

  tasksByChild: any;
  child: any = {};
  totalPaymentByDay: number = 0;
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private location: Location,
    private modalCtrl: ModalController,
    private taskService: TaskService
  ) { }

  ngOnInit() { 

    this.route.paramMap.subscribe(params => {
      const childId = params.get('childId');
      this.tasksByChild = this.taskService.GetTasksByChild(childId);
      
      // this.tasksByChild = this.tarefasService.getTaskByChild(childId);

      // this.totalPaymentByDay = this.getTotalPaymentByDay(this.tasksByChild);
      // this.child = this.childService.getChildById(childId);
    });
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: SimpleModalPage,
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5
    });
    await modal.present();
  }


  getTotalPaymentByDay(tasksByChild: any[]): number {
    let totalPaymentByDay = 0;

    tasksByChild.forEach(task => {
      totalPaymentByDay += task.cost;
    });
    return totalPaymentByDay;
  }


  ngOnDestroy(): void {
    this.tasksByChild = [];
    this.child = {};
    this.totalPaymentByDay = 0;
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']); 
  }

  goBack() {
    // this.router.navigate(['/tabs/tabFilhos']);
    this.location.back();
  }


  // filterTasksByStatus(event: any) {
  //   this.tasksByChild = this.tarefasService.getTaskByChild(this.child.id);
  //   let value = event.target.value;
  //   if(value == 'feitas') {
  //     this.tasksByChild = this.tasksByChild.filter(task => task.status == 'Feita');
  //   } else if(value == 'pendentes') {
  //     this.tasksByChild = this.tasksByChild.filter(task => task.status == 'Pendente');
  //   } else if(value == 'hoje') {
  //     this.tasksByChild = this.tarefasService.getTaskByChild(this.child.id);
  //   }

  // }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.nickname, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

}
