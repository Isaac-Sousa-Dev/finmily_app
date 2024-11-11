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


  userProfile: string | null = null;
  userForm: any = {}

  constructor(
    private router: Router,
    public userService: UserService,
    private toastController: ToastController,
    private authService:  AuthService,
  ) { }

  ngOnInit() {
    
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


  async login(): Promise<void> {
    if(!this.userForm.nickname || !this.userForm.password) {
      this.presentToast('Preencha todos os campos', 'danger');
      return;
    }
    
    let response = await this.userService.login(this.userForm.nickname, this.userForm.password);

    this.userService.userProfile$.subscribe((profile) => {
      this.userProfile = profile;
    })

    if(response.status === 401) {
      this.presentToast('Usuário ou senha inválidos', 'danger');
    } else {
      this.authService.redirectToPageBasedOnProfile();
      this.presentToast('Login efetuado com sucesso', 'success'); 
      this.userService.notifyUserUpdated();
      if(this.userProfile == 'manager') {
        this.router.navigate(['/tabs/tabHome']);
      } else {
        this.router.navigate(['/tabs/tabMinhasTarefas']);
      }
    }
  }

}
