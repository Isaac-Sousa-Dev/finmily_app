import { Component, Input, OnInit } from '@angular/core';
import { ChildrenService } from 'src/services/children.service';

@Component({
  selector: 'app-edit-child-modal',
  templateUrl: './edit-child-modal.component.html',
  styleUrls: ['./edit-child-modal.component.scss'],
})
export class EditChildModalComponent  implements OnInit {

  @Input() child: any;

  formData = {
    nickname: '',
    age: '',
    phone: '',
    password: '',
    role: 'collaborator'
  }

  constructor(
    private childrenService: ChildrenService,
  ) { }

  ngOnInit() {
    console.log(this.child, 'Meu filho');
    this.formData = {
      nickname: this.child.nickname,
      age: this.child.age,
      phone: this.child.phoneNumber,
      password: '',
      role: this.child.role
    }
  }

  async saveChild() {
    await this.childrenService.saveChild(this.formData);
  }

}
