import { Component, OnInit } from '@angular/core';
import { ChildrenService } from 'src/services/children.service';

@Component({
  selector: 'app-edit-child-modal',
  templateUrl: './edit-child-modal.component.html',
  styleUrls: ['./edit-child-modal.component.scss'],
})
export class EditChildModalComponent  implements OnInit {

  formData = {
    nickname: 'Teste',
    age: '12',
    phone: '55555555',
    password: 'teste',
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
