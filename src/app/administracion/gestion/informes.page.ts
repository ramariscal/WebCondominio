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
  condominios: any[] = [];
  edificios: any[] = [];
  departamentos: any[] = [];
  edificiosFiltrados: any[] = [];
  departamentosFiltrados: any[] = [];
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
    this.obtenerEdificios();
    this.obtenerDepartamentos();
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
  obtenerEdificios() {
    this.gestionService.obtenerEdificios().subscribe(
      (data: any) => {
        this.edificios = data;
      },
      (error: any) => {
        console.error('Error al obtener los edificios:', error);
      }
    );
  }
  filtrarEdificios() {
    if (this.persona.condominioPersona) {
      this.edificiosFiltrados = this.edificios.filter(edificio => edificio.id_conjunto === this.persona.condominioPersona);
    } else {
      this.edificiosFiltrados = [];
    }
    this.persona.edificioPersona = null; // Restablecer la selección del edificio
    this.departamentosFiltrados = []; // Restablecer la lista de departamentos
  }
  
  obtenerDepartamentos() {
    this.gestionService.obtenerDepartamentos().subscribe(
      (data: any) => {
        this.departamentos = data;
      },
      (error: any) => {
        console.error('Error al obtener los departamentos:', error);
      }
    );
  }
  filtrarDepartamentos() {
    if (this.persona.edificioPersona) {
      this.departamentosFiltrados = this.departamentos.filter(departamento => departamento.id_edificio === this.persona.edificioPersona);
    } else {
      this.departamentosFiltrados = [];
    }
    this.persona.departamentoPersona = null; // Restablecer la selección del departamento
  }
  

  onChangeRegion(): void {
    const selectedRegionId = this.empleado.value.region;
    this.buscarComunasPorRegion(selectedRegionId);
  
    const regionFormControl = this.empleado.get('region');
    regionFormControl?.setValue(selectedRegionId);
  }  

  async guardarEmpleado() {
  // Validar si hay campos requeridos sin completar
  if (!this.rutF || !this.empleado.primerNombre || !this.empleado.primerApellido || !this.empleado.correo || !this.empleado.direccion || !this.empleado.region || !this.empleado.comuna || !this.empleado.condominioEmpleado || !this.empleado.cargoEmpleado) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Faltan completar campos requeridos',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  // Validar el formato del RUT
  const regexRut = /^\d{7,8}-[0-9Kk]$/;
  if (!regexRut.test(this.rutF)) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El campo de RUT no tiene un formato válido. Ej: 12345678-K',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

// Validar el formato del nombre y apellido
const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
if ((this.empleado.primerNombre && !regexNombreApellido.test(this.empleado.primerNombre)) || (this.empleado.segundoNombre && !regexNombreApellido.test(this.empleado.segundoNombre)) || !regexNombreApellido.test(this.empleado.primerApellido) || (this.empleado.segundoApellido && !regexNombreApellido.test(this.empleado.segundoApellido))) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'Los campos de nombre y apellido solo pueden contener letras y acentos',
    buttons: ['OK']
  });
  await alert.present();
  return;
}

  // Validar el formato de la dirección
  const regexDireccion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]+$/;
  if (!regexDireccion.test(this.empleado.direccion)) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El campo de dirección solo puede contener letras, acentos y números',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }
  
    const rut = this.rutF.split('-')[0];
    const dv = this.rutF.split('-')[1] ? this.rutF.split('-')[1].toUpperCase() : '';
    const empleadoData = {
      rut: rut,
      dv: dv,
      primer_nombre: this.empleado.primerNombre,
      segundo_nombre: this.empleado.segundoNombre,
      primer_apellido: this.empleado.primerApellido,
      segundo_apellido: this.empleado.segundoApellido,
      direccion: this.empleado.direccion,
      mail: this.empleado.correo,
      estatus: 1, // Define el estatus según tus necesidades
      id_cargo: this.empleado.cargoEmpleado,
      id_conjunto: this.empleado.condominioEmpleado,
      id_comuna: this.empleado.comuna,
      id_region: this.empleado.region
    };
  
    try {
      const response = await this.gestionService.agregarEmpleado(empleadoData).toPromise();
      console.log('Empleado agregado correctamente:', response);
      // Realiza las acciones necesarias después de agregar el empleado, como mostrar un mensaje de éxito, redirigir a otra página, etc.
  
      // Mostrar la alerta
      const alert = await this.alertController.create({
        header: 'Empleado agregado Exitosamente',
        message: `Credenciales del empleado:\nUsuario: ${response.usuario}\nClave: ${response.clave}\n\nRecuerde que debe respaldar las credenciales.`,
        buttons: ['OK']
      });
  
      await alert.present();
    } catch (error) {
      console.error('Error al agregar el empleado:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al agregar el empleado',
        buttons: ['OK']
      });
  
      await alert.present();
    }
  }
  
  async guardarResidente() {
// Validar si hay campos requeridos sin completar
if (!this.rutF || !this.persona.primerNombre || !this.persona.primerApellido || !this.persona.correo || !this.persona.tipo_persona || !this.persona.condominioPersona || !this.persona.edificioPersona || !this.persona.departamentoPersona) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'Faltan completar campos requeridos',
    buttons: ['OK']
  });
  await alert.present();
  return;
}

// Validar el formato del nombre y apellido
const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
if ((this.persona.primerNombre && !regexNombreApellido.test(this.persona.primerNombre)) || (this.persona.segundoNombre && !regexNombreApellido.test(this.persona.segundoNombre)) || !regexNombreApellido.test(this.persona.primerApellido) || (this.persona.segundoApellido && !regexNombreApellido.test(this.persona.segundoApellido))) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'Los campos de nombre y apellido solo pueden contener letras y acentos',
    buttons: ['OK']
  });
  await alert.present();
  return;
}
  // Validar el formato del RUT
  const regexRut = /^\d{7,8}-[0-9Kk]$/;
  if (!regexRut.test(this.rutF)) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El campo de RUT no tiene un formato válido',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

// Validar el formato del correo
const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (this.persona.correo && !regexCorreo.test(this.persona.correo)) {
  const alert = await this.alertController.create({
    header: 'Error',
    message: 'El campo de correo no tiene un formato válido',
    buttons: ['OK']
  });
  await alert.present();
  return;
}
  
    const rut = this.rutF.split('-')[0];
    const dv = this.rutF.split('-')[1] ? this.rutF.split('-')[1].toUpperCase() : '';
  
    // Obtener la dirección del conjunto residencial seleccionado
    const conjuntoResidencial = this.condominios.find(condominio => condominio.id_conjunto === this.persona.condominioPersona);
    const direccionConjunto = conjuntoResidencial ? conjuntoResidencial.direccion_conjunto : '';
  
    const residenteData = {
      rut: rut,
      dv: dv,
      primer_nombre: this.persona.primerNombre,
      segundo_nombre: this.persona.segundoNombre,
      primer_apellido: this.persona.primerApellido,
      segundo_apellido: this.persona.segundoApellido,
      direccion: direccionConjunto,
      mail: this.persona.correo,
      estado: 1,
      tip_per: this.persona.tipo_persona,
      id_departamento: this.persona.departamentoPersona,
      id_edificio: this.persona.edificioPersona,
      id_conjunto: this.persona.condominioPersona,
    };
  
    try {
      await this.gestionService.agregarResidente(residenteData).toPromise();
      console.log('Residente agregado correctamente');
      const alert = await this.alertController.create({
        header: 'Residente agregado exitosamente',
        message: 'Se agregó el residente correctamente',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error) {
      console.error('Error al agregar el residente:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error al agregar el residente',
        buttons: ['OK']
      });
      await alert.present();
    }
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
