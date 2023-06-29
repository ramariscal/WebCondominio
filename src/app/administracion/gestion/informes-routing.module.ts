import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformesPage } from './informes.page';

const routes: Routes = [
  {
    path: '',
    component: InformesPage
  },
  {
    path: 'gestion',
    loadChildren: () => import('./informes.module').then( m => m.InformesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformesPageRoutingModule {}
