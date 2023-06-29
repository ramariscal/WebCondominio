import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentePage } from './residente.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentePageRoutingModule {}
