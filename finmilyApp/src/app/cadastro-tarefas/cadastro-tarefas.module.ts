import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroTarefasPageRoutingModule } from './cadastro-tarefas-routing.module';

import { CadastroTarefasPage } from './cadastro-tarefas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroTarefasPageRoutingModule
  ],
  declarations: [CadastroTarefasPage]
})
export class CadastroTarefasPageModule {}
