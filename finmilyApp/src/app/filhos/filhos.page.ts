import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filhos',
  templateUrl: './filhos.page.html',
  styleUrls: ['./filhos.page.scss'],
})
export class FilhosPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarParaMenu() {
    this.router.navigate(['/menu']);  // Redireciona para a rota 'menu'
  }

}
