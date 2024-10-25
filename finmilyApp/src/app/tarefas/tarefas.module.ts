import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarefasPageRoutingModule } from './tarefas-routing.module';

import { TarefasPage } from './tarefas.page';
import { TruncatePipe } from 'src/pipes/truncate/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarefasPageRoutingModule,
    TruncatePipe
  ],
  declarations: [TarefasPage]
})
export class TarefasPageModule {}
