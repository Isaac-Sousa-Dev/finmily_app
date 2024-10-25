import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  private spinner: HTMLIonLoadingElement | null = null;

  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async Show(message?: string): Promise<void> {
    if(this.spinner == null) {
      this.spinner = await this.loadingCtrl.create({
        message: (message) ? message : 'Carregando...',
      })
      await this.spinner.present();
    }
  }

  Hide(): void {
    if(this.spinner != null) {
      this.spinner.dismiss();
      this.spinner = null;
    }
  }
}
