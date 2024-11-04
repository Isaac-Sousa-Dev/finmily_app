import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { ChildrenService } from 'src/services/children.service';

@Component({
  selector: 'app-create-child-modal',
  templateUrl: './create-child-modal.component.html',
  styleUrls: ['./create-child-modal.component.scss'],
})
export class CreateChildModalComponent  implements OnInit {

  @Output() childCreated = new EventEmitter();

  formData = {
    nickname: '',
    age: '',
    phoneNumber: '',
    password: 'finmily123',
    role: 'collaborator'
  }

  constructor(
    private childrenService: ChildrenService,
    private toastController: ToastController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Filho cadastrado com sucesso!',
      duration: 5000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
  }

  async saveChild() {
    await this.childrenService.saveChild(this.formData);
    this.presentToast();
    this.childrenService.notifyChildrenUpdated();
    this.modalController.dismiss();
  }
}
