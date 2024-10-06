import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';
import { ChildService } from '../services/child.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarefas-filho',
  templateUrl: './tarefas-filho.page.html',
  styleUrls: ['./tarefas-filho.page.scss'],
})
export class TarefasFilhoPage implements OnInit, OnDestroy {

  tarefasService = new TarefasService();
  paymentService = new PaymentService(); 
  childService = new ChildService();

  tasksByChild: any[] = [];
  child: any = {};
  totalPaymentByDay: number = 0;
  
  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
      const childId = +params.get('childId')!;

      this.tasksByChild = this.tarefasService.getTaskByChild(childId);

      this.totalPaymentByDay = this.getTotalPaymentByDay(this.tasksByChild);

      this.child = this.childService.getChildById(childId);

    });
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
    this.router.navigate(['/menu']); 
  }

  goBack() {
    // this.router.navigate(['/tabs/tabFilhos']);
    this.location.back();
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

}
