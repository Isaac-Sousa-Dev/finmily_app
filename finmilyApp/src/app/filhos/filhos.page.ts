import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildService } from '../services/child.service';

@Component({
  selector: 'app-filhos',
  templateUrl: './filhos.page.html',
  styleUrls: ['./filhos.page.scss'],
})
export class FilhosPage implements OnInit {

  childService = new ChildService();
  childrens = this.childService.getAllChildrensByParent(1);

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarParaMenu() {
    this.router.navigate(['/menu']); 
  }

}
