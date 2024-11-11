import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { Constants } from 'src/shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userForm: any = {}

  constructor(
    private router: Router,
    public userService: UserService,
    private toastController: ToastController,
    private authService:  AuthService
  ) { }

  ngOnInit() {
    // console.log('Perfil:', this.perfil);
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      color: color,
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
  }

  async goMainPage() {
    let perfil = localStorage.getItem(Constants.KeyStore.perfil);
    console.log('Perfil Tesssss:', perfil);
    if(perfil == 'manager') {
      console.log('IGUAL', perfil);
      await this.router.navigate(['/tabs/tabHome']);
    } else {
      console.log('DIFERENTE', perfil);
      await this.router.navigate(['/tabs/tabMinhasTarefas']);
    }
  }

  async login(): Promise<void> {
    let response = await this.userService.login(this.userForm.nickname, this.userForm.password);
    console.log('Response:', response);
    this.userService.saveDataLoginInfo(response.userAuth, response.token, response.userAuth.role);
    this.authService.redirectToPageBasedOnProfile();
    this.presentToast('Login efetuado com sucesso', 'success'); 
    if(response.status === 401) {
      this.presentToast('Usuário ou senha inválidos', 'danger');
    }
  }

}
