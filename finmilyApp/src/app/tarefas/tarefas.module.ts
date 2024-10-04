import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarefasPageRoutingModule } from './tarefas-routing.module';

import { TarefasPage } from './tarefas.page';
// import { TabsPageModule } from '../tabs/tabs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    // TabsPageModule,
    TarefasPageRoutingModule
  ],
  declarations: [TarefasPage]
})
export class TarefasPageModule {}
