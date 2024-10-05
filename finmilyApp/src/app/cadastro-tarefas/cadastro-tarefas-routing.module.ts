import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroTarefasPage } from './cadastro-tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroTarefasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroTarefasPageRoutingModule {}
