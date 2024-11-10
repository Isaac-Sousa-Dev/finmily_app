import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateChildModalComponent } from 'src/components/modals/create-child-modal/create-child-modal.component';
import { CreateTaskModalComponent } from 'src/components/modals/create-task-modal/create-task-modal.component';
import { Constants } from 'src/shared/constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  perfil: string | null = localStorage.getItem(Constants.KeyStore.perfil);

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {
    console.log('Perfil MMEMEMEM:', this.perfil);
  }

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

  async openModalCreateTask(ionFab: any) {
    ionFab.close();
    const modal = await this.modalController.create({
      component: CreateTaskModalComponent,
      cssClass: 'create-child-modal',
      initialBreakpoint: 0.95,
      breakpoints: [0.95, 0.95, 0.95, 0.95]
    });
  
    await modal.present();
  }

  goToCadastroTarefas() {
    this.router.navigate(['/tabs/tabCadastroTarefas']);
  }
}
