import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from 'src/app/Services/Personal/empleados.service';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { EditarEmpleadosComponent } from 'src/app/modals/editarempleados/editarempleados.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {
  public empleados: any[] = [];
  public empleadoSeleccionado: any = {};
  public cargos: any[] = [];
  public comunas: any[] = [];
  public regiones: any[] = [];
  public mostrarModal: boolean = false;


  constructor(
    private empleadosService: EmpleadosService,
    private modalController: ModalController,
    private http: HttpClient,
    private reactiveFormsModule: ReactiveFormsModule
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

  async abrirModalEditarEmpleado(empleado: any) {
    const modal = await this.modalController.create({
      component: EditarEmpleadosComponent,
      componentProps: {
        empleado: empleado // Pasar el empleado seleccionado como parámetro
      }
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.obtenerEmpleados();
    }
  }
  
  

  cancelarEdicion() {
    this.empleadoSeleccionado = {};
    this.cerrarModal();
  }

  cerrarModal() {
    this.modalController.dismiss();
    this.empleadoSeleccionado = {};
    this.mostrarModal = false;
  }  
}
