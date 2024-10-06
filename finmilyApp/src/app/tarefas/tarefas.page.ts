import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  tarefasService = new TarefasService();
  paymentService = new PaymentService(); 
  
  allTasks = this.tarefasService.getAllTasksOpenByParent(1);
  totalPaymentByMonth: number = 0;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.totalPaymentByMonth = this.paymentService.getTotalPaymentByMonth(this.allTasks);
  }

  navegarParaMenu() {
    this.router.navigate(['/menu']); 
  }

  goBack() {
    this.location.back();
  }

  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
