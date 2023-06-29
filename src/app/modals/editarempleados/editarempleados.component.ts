import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EmpleadosService } from 'src/app/Services/Personal/empleados.service';
import { EmpleadosPage } from 'src/app/personas/empleados/empleados.page';

@Component({
  selector: 'app-editarempleados',
  templateUrl: './editarempleados.component.html',
  styleUrls: ['./editarempleados.component.scss'],
})
export class EditarEmpleadosComponent {

  constructor(private modalController: ModalController, private empleadosService: EmpleadosService, private empleadosPage: EmpleadosPage) {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  async guardarCambios() {
    try {
      // Llama al método de la API para actualizar el empleado
      await this.empleadosService.actualizarEmpleado(this.empleadosPage.empleadoSeleccionado.rut, this.empleadosPage.empleadoSeleccionado);
      // Muestra un mensaje de éxito o realiza otras acciones necesarias
      console.log('Empleado actualizado correctamente');
      // Cierra el modal
      this.modalController.dismiss();
    } catch (error) {
      // Maneja el error de la API de acuerdo a tus necesidades
      console.error('Error al actualizar el empleado', error);
      // Muestra un mensaje de error o realiza otras acciones necesarias
    }
  }
}
