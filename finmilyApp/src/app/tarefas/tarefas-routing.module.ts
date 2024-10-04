import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefasPage } from './tarefas.page';

const routes: Routes = [
  {
    path: '',
    component: TarefasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasPageRoutingModule {}
