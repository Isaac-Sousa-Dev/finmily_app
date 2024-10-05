import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-tarefas',
  templateUrl: './cadastro-tarefas.page.html',
  styleUrls: ['./cadastro-tarefas.page.scss'],
})
export class CadastroTarefasPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }

}
