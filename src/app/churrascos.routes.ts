import { Routes } from '@angular/router';
import { canDeactivateGuard } from './shared/guards/can-deactivate.guard';

export const churrascosRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/lista-churrasco/lista-churrasco.component'),
    // component: ListaChurrascoComponent,
    title: 'Churrascometro - Lista de churrasco',
  },
  {
    path: 'novo',
    loadComponent: () => import('./pages/criacao-churrasco/criacao-churrasco.component'),
    // component: CriacaoChurrascoComponent,
    title: 'Churrascometro - Novo churrasco'
  },
  {
    path: ':id',
    loadComponent: () => import('./pages/detalhe-churrasco/detalhe-churrasco.component'),
    title: 'Churrascometro - Detalhe de Churrasco',
    canDeactivate: [canDeactivateGuard],
    // canMatch: [canMatchGuard],
    // canActivate: [canActivateGuard, canActivate2Guard],
  }
];
