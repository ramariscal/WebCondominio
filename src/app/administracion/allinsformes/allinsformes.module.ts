import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllinsformesPageRoutingModule } from './allinsformes-routing.module';

import { AllinsformesPage } from './allinsformes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllinsformesPageRoutingModule
  ],
  declarations: [AllinsformesPage]
})
export class AllinsformesPageModule {}
