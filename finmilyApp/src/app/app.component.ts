import { Component } from '@angular/core';
import { Constants } from 'src/shared/constants';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor() {
    // manager
    // collaborator
    // localStorage.setItem(Constants.KeyStore.perfil, 'manager');
  }
}
