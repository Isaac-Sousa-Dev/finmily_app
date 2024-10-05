import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageMock } from '../mocks/HomePage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  homeMock = new HomePageMock();
  data = this.homeMock.data;

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.homeMock); 
  }


  navegarParaMenu() {
    this.router.navigate(['/menu']);  // Redireciona para a rota 'menu'
  }

}
