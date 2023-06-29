import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaqueteriaPage } from './paqueteria.page';

const routes: Routes = [
  {
    path: '',
    component: PaqueteriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaqueteriaPageRoutingModule {}
