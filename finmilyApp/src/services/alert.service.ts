import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  async toast(title: string, position: any = 'top'): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: title,
      position: position,
      duration: 3000
    });

    await toast.present();
  }

  async alert(title: string, message: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: ['OK'],
      backdropDismiss: false
    })

    await alert.present();  
  }

  async confirm(title: string, message: string, callback: any): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: title,
      message: message,
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            callback();
          }
        }
      ]
    })

    await alert.present();
  }
}
