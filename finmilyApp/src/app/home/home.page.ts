import { Component, inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/services/home.service';

@Injectable()
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  data: any = '';

  constructor(
    private router: Router,
    private HomeService: HomeService,
  ) { 

  }

  ngOnInit() {
    this.loadData();
  }

  async loadData(): Promise<void> {
    const result = await this.HomeService.GetAll();
    if(result.success) {
      this.data = result.data.data;
    }
    console.log(this.data, 'Meu resultado');
  }


  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }

}
