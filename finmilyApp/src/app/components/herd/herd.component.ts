import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa o Router
@Component({
  selector: 'app-herd',
  templateUrl: './herd.component.html',
  styleUrls: ['./herd.component.scss'],
})
export class HerdComponent  implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit() {}
  navegarParaMenu() {
    this.router.navigate(['/menu']);  // Redireciona para a rota 'menu'
  }
}
