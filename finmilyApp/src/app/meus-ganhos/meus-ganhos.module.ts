import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeusGanhosPageRoutingModule } from './meus-ganhos-routing.module';

import { MeusGanhosPage } from './meus-ganhos.page';
import { TruncatePipe } from 'src/pipes/truncate/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeusGanhosPageRoutingModule,
    TruncatePipe,
  ],
  declarations: [MeusGanhosPage]
})
export class MeusGanhosPageModule {}
