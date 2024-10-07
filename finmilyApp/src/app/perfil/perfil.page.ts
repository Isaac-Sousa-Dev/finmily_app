import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }


  goBack() {
    this.location.back();
  }

}
