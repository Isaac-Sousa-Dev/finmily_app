import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusGanhosPageRoutingModule } from './meus-ganhos-routing.module';

import { MeusGanhosPage } from './meus-ganhos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusGanhosPageRoutingModule
  ],
  declarations: [MeusGanhosPage]
})
export class MeusGanhosPageModule {}
