import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TarefasService } from '../services/tarefas.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-tarefas-filho',
  templateUrl: './tarefas-filho.page.html',
  styleUrls: ['./tarefas-filho.page.scss'],
})
export class TarefasFilhoPage implements OnInit {

  tarefasService = new TarefasService();
  paymentService = new PaymentService(); 
  
  tarefas = this.tarefasService.getAllTasksByManager(1);

  constructor(private router: Router) { }

  ngOnInit() {
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
