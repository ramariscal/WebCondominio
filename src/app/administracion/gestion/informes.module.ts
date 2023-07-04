import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformesPageRoutingModule } from './informes-routing.module';

import { InformesPage } from './informes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InformesPageRoutingModule
  ],
  declarations: [InformesPage]
})
export class InformesPageModule {}
