import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { Constants } from 'src/shared/constants';

const perfil: string | null = localStorage.getItem(Constants.KeyStore.perfil);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tabTarefas',
        loadChildren: () => import('../tarefas/tarefas.module').then(m => m.TarefasPageModule)
      },
      {
        path: 'tabFilhos',
        loadChildren: () => import('../filhos/filhos.module').then(m => m.FilhosPageModule)
      },
      {
        path: 'tabHome',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'tabMinhasTarefas',
        loadChildren: () => import('../minhas-tarefas/minhas-tarefas.module').then( m => m.MinhasTarefasPageModule)
      },
      {
        path: 'tabMeusGanhos',
        loadChildren: () => import('../meus-ganhos/meus-ganhos.module').then( m => m.MeusGanhosPageModule)
      },
      {
        path: 'tabTarefasFilho/:childId',
        loadChildren: () => import('../tarefas-filho/tarefas-filho.module').then( m => m.TarefasFilhoPageModule)
      },
      {
        path: 'tabCadastroTarefas',
        loadChildren: () => import('../cadastro-tarefas/cadastro-tarefas.module').then( m => m.CadastroTarefasPageModule)
      },
      {
        path: 'tabPerfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
