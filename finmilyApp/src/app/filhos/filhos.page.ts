import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildService } from '../services/child.service';
import { PaymentService } from '../services/payment.service';
import { TarefasService } from '../services/tarefas.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filhos',
  templateUrl: './filhos.page.html',
  styleUrls: ['./filhos.page.scss'],
})
export class FilhosPage implements OnInit {

  childService = new ChildService();
  paymentService = new PaymentService();
  tarefasService = new TarefasService();

  childrens = this.childService.getAllChildrensByParent(1);
  allTasks = this.tarefasService.getAllTasksOpenByParent(1);
  totalPaymentByMonth: number = 0;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    this.totalPaymentByMonth = this.paymentService.getTotalPaymentByMonth(this.allTasks);
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']); 
  }

  goBack() {
    this.location.back();
  }

}
