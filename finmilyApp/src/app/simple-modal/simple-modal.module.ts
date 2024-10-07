import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimpleModalPageRoutingModule } from './simple-modal-routing.module';

import { SimpleModalPage } from './simple-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimpleModalPageRoutingModule
  ],
  declarations: [SimpleModalPage]
})
export class SimpleModalPageModule {}
