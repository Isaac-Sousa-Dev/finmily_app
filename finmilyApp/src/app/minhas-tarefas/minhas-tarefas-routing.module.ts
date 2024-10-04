import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MinhasTarefasPage } from './minhas-tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: MinhasTarefasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinhasTarefasPageRoutingModule {}
