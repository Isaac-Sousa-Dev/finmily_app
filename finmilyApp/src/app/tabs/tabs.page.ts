import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  perfil: string | null = localStorage.getItem('finmily:perfl');

  constructor(private router: Router) {
    
  }


  goToCadastroTarefas() {
    this.router.navigate(['/tabs/tabCadastroTarefas']);
  }
}
