// auth.service.ts
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/shared/constants';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  userProfile: string | null = null;  

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
    });
  }

  // Método para verificar o perfil e redirecionar
  redirectToPageBasedOnProfile() {

    switch (this.userProfile) {
      case 'manager':
        this.router.navigate(['/tabs/tabHome']);
        break;
      case 'collaborator':
        this.router.navigate(['/tabs/tabMinhasTarefas']);
        break;
    }
  }

}
