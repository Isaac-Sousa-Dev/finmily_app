import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreateChildModalComponent } from 'src/components/modals/create-child-modal/create-child-modal.component';
import { CreateTaskModalComponent } from 'src/components/modals/create-task-modal/create-task-modal.component';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Constants } from 'src/shared/constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  userProfile: string | null = null;
 
  constructor(
    private router: Router,
    private modalController: ModalController,
    private userService: UserService
  ) {
    
  }

  ngOnInit(): void {
    // Assina o perfil do usuário
    this.userService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
      // Faça verificações com o perfil, se necessário
    });

    console.log('PROFILE:', this.userProfile);
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
