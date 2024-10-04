import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilhosPageRoutingModule } from './filhos-routing.module';

import { FilhosPage } from './filhos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilhosPageRoutingModule
  ],
  declarations: [FilhosPage]
})
export class FilhosPageModule {}
