import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ChildrenService } from 'src/services/children.service';

@Component({
  selector: 'app-edit-child-modal',
  templateUrl: './edit-child-modal.component.html',
  styleUrls: ['./edit-child-modal.component.scss'],
})
export class EditChildModalComponent  implements OnInit {

  @Input() child: any;

  formData = {
    uid: '',
    nickname: '',
    age: '',
    phoneNumber: '',
    role: 'collaborator'
  }

  constructor(
    private childrenService: ChildrenService,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.formData = {
      uid: this.child.uid,
      nickname: this.child.nickname,
      age: this.child.age,
      phoneNumber: this.child.phoneNumber,
      role: this.child.role
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Filho atualizado com sucesso!',
      duration: 5000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline',
    });
    await toast.present();
  }

  async editChild() {
    await this.childrenService.updateChild(this.formData);
    this.presentToast();
    this.childrenService.notifyChildrenUpdated();
    this.modalController.dismiss();
  }

}
