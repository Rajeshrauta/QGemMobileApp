import { Routes } from '@angular/router';
import { HomePage } from './home.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'order',
        loadComponent: () =>
          import('./pages/order/order.page').then((m) => m.OrderPage),
      },
      {
        path: 'order-detail/:docNumber',
        loadComponent: () => 
          import('./component/order-detail/order-detail.page').then( m => m.OrderDetailPage)
      },
      {
        path: '',
        redirectTo: '/home/order',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home/order',
    pathMatch: 'full',
  },
];
