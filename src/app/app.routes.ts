import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default redirect
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'order',
        loadComponent: () =>
          import('./home/pages/order/order.page').then((m) => m.OrderPage),
      },
      {
        path: 'order-detail/:docNumber',
        loadComponent: () =>
          import('./home/component/order-detail/order-detail.page').then(
            (m) => m.OrderDetailPage
          ),
      },
      {
        path: '',
        redirectTo: '/home/order',
        pathMatch: 'full',
      },
    ],
  },
];