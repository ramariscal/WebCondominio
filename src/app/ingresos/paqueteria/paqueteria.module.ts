import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaqueteriaPageRoutingModule } from './paqueteria-routing.module';

import { PaqueteriaPage } from './paqueteria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaqueteriaPageRoutingModule
  ],
  declarations: [PaqueteriaPage]
})
export class PaqueteriaPageModule {}
