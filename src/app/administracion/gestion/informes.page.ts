import { Component } from '@angular/core';

@Component({
  selector: 'app-informes',
  templateUrl: 'informes.page.html',
  styleUrls: ['informes.page.scss'],
})
export class InformesPage {
  selectedSegment: string;
  empleado: any = {};
  persona: any = {};
  vehiculo: any = {};
  mostrarFormularioEditar = false;
  patenteIngresada = false;
  vehiculosRegistrados: any[] = [
    { patente: 'ABC123', tipo: '4X4', color: 'rojo', estado: 'activo', residente: 'Antony Diaz', depto: '401', estacionamiento: 'Propietario' },
    // Agrega más vehículos registrados si deseas
  ];
  actualizacionExitosa = false;
  agregadoExitoso = false;



  constructor() {
    this.selectedSegment = 'empleados';
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  guardarEmpleado() {
    // Lógica para guardar el empleado
    console.log('Guardar empleado:', this.empleado);
    // Puedes enviar los datos a un servicio, hacer una solicitud HTTP, etc.
    // Reinicia el formulario o realiza las acciones necesarias después de guardar
    this.empleado = {};
  }

  guardarPersona() {
    // Lógica para guardar la persona
    console.log('Guardar persona:', this.persona);
    // Puedes enviar los datos a un servicio, hacer una solicitud HTTP, etc.
    // Reinicia el formulario o realiza las acciones necesarias después de guardar
    this.persona = {};
  }

  guardarVehiculo() {
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
