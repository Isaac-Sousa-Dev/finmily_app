import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.page.html',
  styleUrls: ['./tarefas.page.scss'],
})
export class TarefasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  navegarParaMenu() {
    this.router.navigate(['/menu']);  // Redireciona para a rota 'menu'
  }
}
