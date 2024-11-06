import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {
    // manager
    // collaborator
    localStorage.setItem('finmily:perfl', 'collaborator');
  }
}
