import { Component } from '@angular/core';
import { GestionService } from 'src/app/Services/Administracion/gestion.service';
import { ApiService } from 'src/app/Services/api.service';
import { Cargo, Comuna, Empleado, Region } from 'src/app/models/empleado.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-informes',
  templateUrl: 'informes.page.html',
  styleUrls: ['informes.page.scss'],
})
export class InformesPage {
  rutF: string = '';
  selectedSegment: string;
  empleado: any = {};
  persona: any = {};
  vehiculo: any = {};
  mostrarFormularioEditar = false;
  patenteIngresada = false;
  cargos: any [] = [];
  regiones: any [] = []; // Define la propiedad 'regiones'
  comunas: any [] = []; // Define la propiedad 'comunas'
  public condominios: any[] = [];
  actualizacionExitosa = false;
  agregadoExitoso = false;
  vehiculosRegistrados: any[] = [
    { patente: 'ABC123', tipo: '4X4', color: 'rojo', estado: 'activo', residente: 'Antony Diaz', depto: '401', estacionamiento: 'Propietario' },
    // Agrega más vehículos registrados si deseas
  ];
  validarRutDV(rut: string = ''): boolean {
    if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) {
      return false; // El formato del Rut es incorrecto
    }

    const rutDigits = rut.split('-')[0]; // Obtener los dígitos del Rut
    const dv = rut.split('-')[1].toUpperCase(); // Obtener el dígito verificador y convertirlo a mayúsculas
    const rutNumbers = Array.from(rutDigits).reverse().map(Number); // Convertir los dígitos del Rut a un array y revertir el orden
    const factor = [2, 3, 4, 5, 6, 7, 2, 3]; // Factor para el cálculo del dígito verificador

    let sum = 0;
    for (let i = 0; i < rutNumbers.length; i++) {
      sum += rutNumbers[i] * factor[i % 8];
    }

    const expectedDV = 11 - (sum % 11); // Calcular el dígito verificador esperado
    const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : String(expectedDV); // Obtener el dígito verificador calculado

    return dv === calculatedDV; // Comparar el dígito verificador ingresado con el calculado
  }

  constructor(
    private gestionService: GestionService,
    private apiService: ApiService,
    private alertController: AlertController
  ) {
    this.selectedSegment = 'empleados';
  }

  ngOnInit() {
    this.obtenerRegiones();
    this.obtenerCondominios();
    this.obtenerCargos();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  obtenerCargos() {
    this.gestionService.obtenerCargos().subscribe(
      (data: any) => {
        this.cargos = data;
      },
      (error: any) => {
        console.error('Error al obtener los cargos:', error);
      }
    );
  }

  obtenerComunas() {
    this.gestionService.obtenerComunas().subscribe(
      (data: any) => {
        this.comunas = data;
      },
      (error: any) => {
        console.error('Error al obtener las comunas:', error);
      }
    );
  }

  obtenerRegiones() {
    this.gestionService.obtenerRegiones().subscribe(
      (data: any) => {
        this.regiones = data;
      },
      (error: any) => {
        console.error('Error al obtener las regiones:', error);
      }
    );
  }

  buscarComunasPorRegion(id_region: string) {
    this.gestionService.buscarComunasPorRegion(id_region).subscribe((comunas: any[]) => {
      this.comunas = comunas;
      this.empleado.comuna = null;
    });
  }

  obtenerCondominios() {
    this.gestionService.obtenerCondominios().subscribe(
      (data: any) => {
        this.condominios = data;
      },
      (error: any) => {
        console.error('Error al obtener los condominios:', error);
      }
    );
  }

  onChangeRegion(): void {
    const selectedRegionId = this.empleado.value.region;
    this.buscarComunasPorRegion(selectedRegionId);
  
    const regionFormControl = this.empleado.get('region');
    regionFormControl?.setValue(selectedRegionId);
  }  

  async guardarEmpleado() {
    const rut = this.rutF.split('-')[0];
    const dv = this.rutF.split('-')[1] ? this.rutF.split('-')[1].toUpperCase() : '';
    const empleadoData = {
      rut: rut,
      dv: dv,
      primer_nombre: this.persona.primerNombre,
      segundo_nombre: this.persona.segundoNombre,
      primer_apellido: this.persona.primerApellido,
      segundo_apellido: this.persona.segundoApellido,
      direccion: this.empleado.direccion,
      mail: this.persona.correo,
      estatus: 1, // Define el estatus según tus necesidades
      id_cargo: this.empleado.cargoEmpleado,
      id_conjunto: this.empleado.condominioEmpleado,
      id_comuna: this.empleado.comuna,
      id_region: this.empleado.region
    };
    
    this.gestionService.agregarEmpleado(empleadoData).subscribe(
      async (response: any) => {
        console.log('Empleado agregado correctamente:', response);
        // Realiza las acciones necesarias después de agregar el empleado, como mostrar un mensaje de éxito, redirigir a otra página, etc.
  
        // Mostrar la alerta
        const alert = await this.alertController.create({
          header: 'Empleado agregado Exitosamente',
          message: `Credenciales del empleado:\nUsuario: ${response.usuario}\nClave: ${response.clave}\n\nRecuerde que debe respaldar las credenciales.`,
          buttons: ['OK']
        });
  
        await alert.present();
      },
      (error: any) => {
        console.error('Error al agregar el empleado:', error);
        // Realiza las acciones necesarias en caso de error, como mostrar un mensaje de error, realizar un rollback, etc.
      }
    );
  }
  
  
  
  

  guardarVehiculo() {
    // Lógica para guardar el vehículo
    console.log('Guardar vehículo:', this.vehiculo);
    // Puedes enviar los datos a un servicio, hacer una solicitud HTTP, etc.
    // Reinicia el formulario o realiza las acciones necesarias después de guardar
    this.vehiculo = {};
  }
    guardarPersona() {
    // Lógica para guardar el vehículo
    console.log('Guardar vehículo:', this.vehiculo);
    // Puedes enviar los datos a un servicio, hacer una solicitud HTTP, etc.
    // Reinicia el formulario o realiza las acciones necesarias después de guardar
    this.vehiculo = {};
  }


  buscarVehiculo() {
    const patenteIngresada = this.vehiculo.patente;

    // Verificar si la patente está registrada
    const vehiculoEncontrado = this.vehiculosRegistrados.find(
      (vehiculo) => vehiculo.patente === patenteIngresada
    );

    if (vehiculoEncontrado) {
      // La patente está registrada, mostrar formulario de editar
      this.vehiculo = vehiculoEncontrado;
      this.mostrarFormularioEditar = true;
    } else {
      // La patente no está registrada, mostrar formulario de agregar
      this.mostrarFormularioEditar = false;
    }

    this.patenteIngresada = true;
  }

  guardarCambios() {
    // Lógica para guardar los cambios del formulario de edición

    // Limpia el formulario
    this.vehiculo = {};

    // Muestra el mensaje de actualización correcta
    this.actualizacionExitosa = true;

    // Reinicia la variable después de unos segundos para ocultar el mensaje
    setTimeout(() => {
      this.actualizacionExitosa = false;
    }, 3000); // El mensaje se ocultará después de 3 segundos (ajusta el tiempo según tus necesidades)

    // Muestra el formulario de ingresar patente
    this.patenteIngresada = false;
    this.mostrarFormularioEditar = false;
  }

  agregarVehiculo() {
    // Aquí deberías implementar la lógica para agregar el vehículo
    // Muestra el mensaje de actualización correcta
    this.agregadoExitoso = true;

    // Reinicia la variable después de unos segundos para ocultar el mensaje
    setTimeout(() => {
      this.agregadoExitoso = false;
    }, 3000); // El mensaje se ocultará después de 3 segundos (ajusta el tiempo según tus necesidades)

    // Muestra el formulario de ingresar patente
    this.patenteIngresada = false;
    this.mostrarFormularioEditar = false;
  }
}
