import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  tarefasService = new TarefasService();
  paymentService = new PaymentService(); 
  
  tarefas = this.tarefasService.getAllTasksByManager(1);

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.tarefasService.getAllTasksByManager(1));
    console.log(this.paymentService.getTotalPaymentMonthByManager(1));
  }

  navegarParaMenu() {
    this.router.navigate(['/menu']); 
  }


  onIonInfinite(ev: any) {
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
