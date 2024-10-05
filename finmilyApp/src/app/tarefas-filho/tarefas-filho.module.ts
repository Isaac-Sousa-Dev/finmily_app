import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarefasFilhoPageRoutingModule } from './tarefas-filho-routing.module';

import { TarefasFilhoPage } from './tarefas-filho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarefasFilhoPageRoutingModule
  ],
  declarations: [TarefasFilhoPage]
})
export class TarefasFilhoPageModule {}
