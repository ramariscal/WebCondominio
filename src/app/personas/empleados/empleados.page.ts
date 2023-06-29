import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/Services/Personal/empleados.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  public empleados: any[] = [];
  public empleadoSeleccionado: any = {};
  public mostrarModal = false;
  public cargos: any[] = [];
  public comunas: any[] = [];
  public regiones: any[] = [];

  constructor(
    private empleadosService: EmpleadosService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerEmpleados();
    this.obtenerCargos();
    this.obtenerComunas();
    this.obtenerRegiones();
  }

  obtenerEmpleados() {
    this.empleadosService.mostrarEmpleados().subscribe(
      (data: any) => {
        this.empleados = data.map((empleado: any) => {
          empleado.estatus = empleado.estatus === 1 ? 'Vinculado' : 'Desvinculado';
          return empleado;
        });
      },
      (error: any) => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  obtenerCargos() {
    this.empleadosService.obtenerCargos().subscribe(
      (data: any) => {
        this.cargos = data;
      },
      (error: any) => {
        console.error('Error al obtener los cargos:', error);
      }
    );
  }

  obtenerComunas() {
    this.empleadosService.obtenerComunas().subscribe(
      (data: any) => {
        this.comunas = data;
      },
      (error: any) => {
        console.error('Error al obtener las comunas:', error);
      }
    );
  }

  obtenerRegiones() {
    this.empleadosService.obtenerRegiones().subscribe(
      (data: any) => {
        this.regiones = data;
      },
      (error: any) => {
        console.error('Error al obtener las regiones:', error);
      }
    );
  }

  editarEmpleado(empleado: any) {
    if (empleado && empleado.rut) {
      this.empleadoSeleccionado = { ...empleado };
      this.mostrarModal = true;
    }
  }

  actualizarEmpleado() {
    // Lógica de actualización de empleado
    this.cerrarModal();
  }

  cancelarEdicion() {
    this.empleadoSeleccionado = {};
    this.mostrarModal = false;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.empleadoSeleccionado = {};
  }
}
