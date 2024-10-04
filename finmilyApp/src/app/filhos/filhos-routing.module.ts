import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilhosPage } from './filhos.page';

const routes: Routes = [
  {
    path: '',
    component: FilhosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilhosPageRoutingModule {}
