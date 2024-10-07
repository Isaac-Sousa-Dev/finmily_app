import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimpleModalPage } from './simple-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SimpleModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimpleModalPageRoutingModule {}
