// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  // Método para verificar o perfil e redirecionar
  redirectToPageBasedOnProfile() {
    const perfil = localStorage.getItem(Constants.KeyStore.perfil);

    switch (perfil) {
      case 'manager':
        this.router.navigate(['/tabs/tabHome']);
        break;
      case 'collaborator':
        this.router.navigate(['/tabs/tabTarefas']);
        break;

      default:
        this.router.navigate(['/tabs/tabHome']); // rota padrão caso o perfil seja desconhecido
        break;
    }
  }
}
