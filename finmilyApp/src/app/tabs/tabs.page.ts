import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  perfil: string | null = localStorage.getItem('finmily:perfl');

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {}

  openModalCreateChild() {
    // this.modalController.create({
    //   component: 
    // })
    console.log('openModalCreateChild');
  }

  goToCadastroTarefas() {
    this.router.navigate(['/tabs/tabCadastroTarefas']);
  }
}
