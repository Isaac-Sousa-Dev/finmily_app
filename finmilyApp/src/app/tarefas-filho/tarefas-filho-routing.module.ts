import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefasFilhoPage } from './tarefas-filho.page';

const routes: Routes = [
  {
    path: '',
    component: TarefasFilhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefasFilhoPageRoutingModule {}
