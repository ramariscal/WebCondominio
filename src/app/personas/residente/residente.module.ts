import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidentePageRoutingModule } from './residente-routing.module';

import { ResidentePage } from './residente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResidentePageRoutingModule
  ],
  declarations: [ResidentePage]
})
export class ResidentePageModule {}
