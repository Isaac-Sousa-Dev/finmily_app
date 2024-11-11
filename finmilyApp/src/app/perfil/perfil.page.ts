import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  userLogged: any;

  constructor(
    private router: Router, 
    private location: Location, 
    private userService: UserService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.userLogged = user;
    })
    console.log('User:', this.userLogged);
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }

  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Sair do app',
      message: `Tem certeza que deseja sair do app?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sair',
          role: 'confirm',
          handler: () => {
            this.logout();
          } 
        },
      ],
    });
    await alert.present();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }


  goBack() {
    this.location.back();
  }

}
