import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { CreateChildModalComponent } from 'src/components/modals/create-child-modal/create-child-modal.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [AppComponent, CreateChildModalComponent], 
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR', useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
