import { Component, OnInit } from '@angular/core';

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
    password: '',
  }

  constructor() { }

  ngOnInit() {}

  async saveChild() {
    console.log(this.formData);
  }
}
