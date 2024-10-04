import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusGanhosPage } from './meus-ganhos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusGanhosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusGanhosPageRoutingModule {}
