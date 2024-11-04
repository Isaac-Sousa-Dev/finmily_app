import { Component, Input } from '@angular/core';
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

  async openModalCreateChild(ionFab: any) {
    ionFab.close();
    const modal = await this.modalController.create({
      component: CreateChildModalComponent,
      cssClass: 'create-child-modal',
      initialBreakpoint: 0.63,
      breakpoints: [0.63, 0.63, 0.63, 0.63]
    });
  
    await modal.present();
  }

  goToCadastroTarefas() {
    this.router.navigate(['/tabs/tabCadastroTarefas']);
  }
}
