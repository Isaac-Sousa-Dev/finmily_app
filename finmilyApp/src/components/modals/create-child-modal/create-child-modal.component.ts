import { Component, OnInit } from '@angular/core';
import { ChildrenService } from 'src/services/children.service';

@Component({
  selector: 'app-create-child-modal',
  templateUrl: './create-child-modal.component.html',
  styleUrls: ['./create-child-modal.component.scss'],
})
export class CreateChildModalComponent  implements OnInit {

  formData = {
    nickname: '',
    age: '',
    phone: '',
    password: 'finmily123',
    role: 'collaborator'
  }

  constructor(
    private childrenService: ChildrenService,
  ) { }

  ngOnInit() {}

  async saveChild() {
    await this.childrenService.saveChild(this.formData);
  }
}
