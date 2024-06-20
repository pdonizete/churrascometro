import { Routes } from '@angular/router';
import { canActivateChildGuard } from './shared/guards/can-activate-child.guard';
import { canMatchGuard } from './shared/guards/can-match.guard';

export const routes: Routes = [
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home.component'),
    title: 'Churrascometro - Home' 
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full' 
  },
  {
    path: 'churrascos',
    loadChildren: () => import('./churrascos.routes').then(r => r.churrascosRoutes),
    canActivateChild: [canActivateChildGuard]
  },
  {
    path: 'produtos',
    canMatch: [canMatchGuard],
    loadChildren: () => import('./produtos.routes').then(r => r.produtosRoutes),
  },
  { 
    path: 'erro/:status',
    loadComponent: () => import('./pages/erro/erro.component'),
  },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component') },
];
