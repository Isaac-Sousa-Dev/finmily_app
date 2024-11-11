import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomePageMock } from 'src/mocks/HomePage';
import { HomeService } from 'src/services/home.service';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any = '';

  dataMock = new HomePageMock().data;

  constructor(
    private router: Router,
    private HomeService: HomeService,
  ) { 

  }

  ngOnInit() {
    // this.loadData();
    this.data = this.dataMock;
    console.log(this.dataMock, 'Meu resultado mock');
  }

  async loadData(): Promise<void> {
    const result = await this.HomeService.GetData();
    this.data = result.data;
    console.log(this.data, 'Meu resultado');
  }


  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }

}
