import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarefas-filho',
  templateUrl: './tarefas-filho.page.html',
  styleUrls: ['./tarefas-filho.page.scss'],
})
export class TarefasFilhoPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarParaMenu() {
    this.router.navigate(['/menu']); 
  }

}
