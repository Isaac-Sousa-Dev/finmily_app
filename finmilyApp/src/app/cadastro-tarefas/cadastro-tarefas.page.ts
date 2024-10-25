import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-tarefas',
  templateUrl: './cadastro-tarefas.page.html',
  styleUrls: ['./cadastro-tarefas.page.scss'],
})
export class CadastroTarefasPage implements OnInit {

  diaFrequencia: string = 'diaSemana';
  tipoTarefa: string = 'pontos';

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
