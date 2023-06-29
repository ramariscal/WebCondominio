import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllinsformesPage } from './allinsformes.page';

const routes: Routes = [
  {
    path: '',
    component: AllinsformesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllinsformesPageRoutingModule {}
