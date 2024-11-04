import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MinhasTarefasPageRoutingModule } from './minhas-tarefas-routing.module';

import { MinhasTarefasPage } from './minhas-tarefas.page';
import { TruncatePipe } from 'src/pipes/truncate/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MinhasTarefasPageRoutingModule,
    TruncatePipe
  ],
  declarations: [MinhasTarefasPage]
})
export class MinhasTarefasPageModule {}
