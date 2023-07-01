import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarEmpleadosComponent } from './editarempleados.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditarEmpleadosComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditarempleadosModule { }
