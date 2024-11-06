import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  perfil: string | null = localStorage.getItem('finmily:perfl');

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('Perfil:', this.perfil);
  }

  goMainPage() {
    if(this.perfil === 'manager') {
      this.router.navigate(['/tabs/tabHome']);
    } else {
      this.router.navigate(['/tabs/tabMinhasTarefas']);
    }
  }

}
