import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  perfil: string | null = localStorage.getItem('finmily:perfl');

  userForm: any = {}

  constructor(
    private router: Router,
    public userService: UserService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    console.log('Perfil:', this.perfil);
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

  goMainPage() {
    if(this.perfil === 'manager') {
      this.router.navigate(['/tabs/tabHome']);
    } else {
      this.router.navigate(['/tabs/tabMinhasTarefas']);
    }
  }

  async login(): Promise<void> {
    let response = await this.userService.login(this.userForm.nickname, this.userForm.password);
    if(response.status === 401) {
      this.presentToast('Usuário ou senha inválidos', 'danger');
    }
  }

}
