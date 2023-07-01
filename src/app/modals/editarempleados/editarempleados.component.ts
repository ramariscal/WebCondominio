import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from 'src/app/Services/Personal/empleados.service';
import { EmpleadosPage } from 'src/app/personas/empleados/empleados.page';
import { Cargo, Comuna, Empleado, Region } from 'src/app/models/empleado.model';

@Component({
  selector: 'app-editarempleados',
  templateUrl: './editarempleados.component.html',
  styleUrls: ['./editarempleados.component.scss'],
})
export class EditarEmpleadosComponent implements OnInit {
  empleadoForm: FormGroup;
  cargos: Cargo[] = [];
  regiones: Region[] = [];
  comunas: Comuna[] = [];

  @Input() empleado: any; // Recibir el empleado seleccionado como parámetro

  constructor(
    private modalController: ModalController,
    private empleadosService: EmpleadosService,
    private empleadosPage: EmpleadosPage,
    private formBuilder: FormBuilder
  ) {
    this.empleadoForm = this.formBuilder.group({
      rut: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      estado: ['', Validators.required],
      cargo: new FormControl('', Validators.required),
      direccion: ['', Validators.required],
      region: new FormControl('', Validators.required),
      comuna: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadCargos();
    this.obtenerRegiones();

    // Inicializar los campos del formulario con la información del empleado
    this.empleadoForm.patchValue({
      rut: this.empleado.rut,
      nombres: this.empleado.primer_nombre,
      apellidos: this.empleado.primer_apellido,
      correo: this.empleado.mail,
      estado: this.empleado.estatus === 'Vinculado' ? '1' : '0',
      cargo: this.empleado.id_cargo,
      direccion: this.empleado.direccion,
      region: this.empleado.id_region,
      comuna: this.empleado.id_comuna
    });

    this.onChangeRegion();

    // Recargar los datos de los combo-box
    this.loadCargos();
    this.obtenerRegiones();
  }

  loadCargos(): void {
    this.empleadosService.obtenerCargos().subscribe((cargos: Cargo[]) => {
      this.cargos = cargos;
    });
  }

  obtenerRegiones(): void {
    this.empleadosService.obtenerRegiones().subscribe((regiones: Region[]) => {
      this.regiones = regiones;
    });
  }

  onChangeRegion(): void {
    const selectedRegionId = this.empleadoForm.value.region;
    this.buscarComunasPorRegion(selectedRegionId);
  
    const regionFormControl = this.empleadoForm.get('region');
    regionFormControl?.setValue(selectedRegionId);
  }
  
  buscarComunasPorRegion(id_region: string): void {
    this.empleadosService.buscarComunasPorRegion(id_region).subscribe((comunas: Comuna[]) => {
      this.comunas = comunas;
  
      const comunaFormControl = this.empleadoForm.get('comuna');
      comunaFormControl?.setValue('');
  
      const empleadoComuna = this.empleado.comuna;
      if (empleadoComuna) {
        comunaFormControl?.setValue(empleadoComuna.id_comuna);
      }
    });
  } 

  getCargoActual(): Cargo | undefined {
    const cargoId = this.empleadoForm.value.id_cargo;
    const cargoActual = this.cargos.find((cargo) => cargo.id_cargo === cargoId);
    console.log('Cargo actual:', cargoActual);
    return cargoActual;
  }
  
  getRegionActual(): Region | undefined {
    const regionId = this.empleadoForm.value.id_region;
    const regionActual = this.regiones.find((region) => region.id_region === regionId);
    console.log('Región actual:', regionActual);
    return regionActual;
  }
  
  getComunaActual(): Comuna | undefined {
    const comunaId = this.empleadoForm.get('comuna')?.value;
    const comunaActual = this.comunas.find((comuna) => comuna.nombre_comuna === comunaId);
    console.log('Form value:', this.empleadoForm.value);
    console.log('Comuna ID:', comunaId);
    console.log('Comunas:', this.comunas);
    console.log('Comuna actual:', comunaActual);
    return comunaActual;
  }
  
  probar(): void {
    if (this.cargos.length > 0) {
      const cargoActual = this.getCargoActual();
      console.log('Cargo actual:', cargoActual);
    }
  
    if (this.regiones.length > 0) {
      const regionActual = this.getRegionActual();
      console.log('Región actual:', regionActual);
    }
  
    if (this.comunas.length > 0) {
      const comunaActual = this.getComunaActual();
      console.log('Comuna actual:', comunaActual);
    }
  }

  actualizarEmpleado(): void {
    if (this.empleadoForm.valid) {
      const rut = this.empleadoForm.value.rut;
      const datosEmpleado = {
        dv: '', // Obtén el valor del campo DV del formulario
        primer_nombre: this.empleadoForm.value.nombres,
        segundo_nombre: '', // Obtén el valor del campo Nombres del formulario
        primer_apellido: this.empleadoForm.value.apellidos,
        segundo_apellido: '', // Obtén el valor del campo Apellidos del formulario
        direccion: this.empleadoForm.value.direccion,
        mail: this.empleadoForm.value.correo,
        estatus: this.empleadoForm.value.estado,
        id_cargo: this.empleadoForm.value.cargo,
        id_conjunto: '', // Obtén el valor del campo Conjunto del formulario
        id_comuna: this.empleadoForm.value.comuna,
        id_region: this.empleadoForm.value.region,
        id_empleado: '' // Obtén el ID del empleado que se está editando
      };

      this.empleadosService.actualizarEmpleado(rut, datosEmpleado).subscribe(
        (empleado: Empleado) => {
          // Empleado actualizado correctamente
        },
        (error: any) => {
          // Error al actualizar el empleado
        }
      );
    }
  }

  cancelar(): void {
    // Código para cancelar la edición del empleado
  }
  
}
