import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateChildModalComponent } from 'src/components/modals/create-child-modal/create-child-modal.component';

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

  openModalCreateChild(ionFab: any) {
    ionFab.close();
    this.modalController.create({
      component: CreateChildModalComponent,
      cssClass: 'create-child-modal',
      initialBreakpoint: 0.75,
      breakpoints: [0.75, 0.75, 0.75, 0.75]
    }).then(modal => {
      modal.present();
    })
    console.log('openModalCreateChild');
  }

  goToCadastroTarefas() {
    this.router.navigate(['/tabs/tabCadastroTarefas']);
  }
}
