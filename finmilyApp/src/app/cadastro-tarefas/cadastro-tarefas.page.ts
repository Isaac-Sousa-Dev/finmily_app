import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChildrenService } from 'src/services/children.service';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-cadastro-tarefas',
  templateUrl: './cadastro-tarefas.page.html',
  styleUrls: ['./cadastro-tarefas.page.scss'],
})
export class CadastroTarefasPage implements OnInit {

  formData = {
    user: '',
    title: '',
    description: '',
    cost: '',
    daysOfWeek: '',
    status: 'pending',
    deleted: false,
    active: true,
    happiness: 0,
    everyDay: false,
  }

  diaFrequencia: string = 'diaSemana';
  tipoTarefa: string = 'dinheiro';
  childrens: any = [];

  constructor(
    private router: Router, 
    private location: Location,
    private childService: ChildrenService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.getChildrensByManager();
  }

  ngOnDestroy() {
    this.formData = {
      user: '',
      title: '',
      description: '',
      cost: '',
      daysOfWeek: '',
      status: 'pending',
      deleted: false,
      active: true,
      happiness: 0,
      everyDay: false,
    }
  }

  navegarParaMenu() {
    this.router.navigate(['/tabs/tabPerfil']);
  }

  async getChildrensByManager() {
    this.childrens = await this.childService.getAllChildrensByParent(); 
    console.log('Filhos', this.childrens);
  }

  async saveTask(event: any) {
    const taskData = { ...this.formData };

    if(this.diaFrequencia === 'diaSemana') {
      taskData.everyDay = false;
    } else {
      taskData.everyDay = true;
    }

    // Convertendo o array daysOfWeek para uma string separada por vírgulas
    if (Array.isArray(taskData.daysOfWeek)) {
      taskData.daysOfWeek = taskData.daysOfWeek.join(', ');
    }

    await this.taskService.SaveTask(taskData);

    this.router.navigate(['/tabs/tabTarefas']);
  }

  goBack() {
    this.location.back();
  }

}
