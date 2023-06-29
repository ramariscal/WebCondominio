import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { ResidentesService } from 'src/app/Services/Personal/residentes.service';

@Component({
  selector: 'app-residente',
  templateUrl: './residente.page.html',
  styleUrls: ['./residente.page.scss'],
})
export class ResidentePage implements OnInit, AfterViewInit {
  @ViewChild('rutInput', { static: false }) rutInput!: IonInput;
  @ViewChild('dvInput', { static: false }) dvInput!: IonInput;
  
  public residentes: any[] = [];
  public vehiculos: any [] = [];

  public selectedSegment: string;
  public edicionActiva: boolean = false;
  public residenteEditando: any;

  constructor(private residentesService: ResidentesService) {
    this.selectedSegment = 'residentes';
  }

  ngOnInit() { 
    this.obtenerResidentes();
    this.obtenerResidentesVeh();
   }
  
   ionViewDidEnter(){
    this.obtenerResidentes();
    this.obtenerResidentesVeh();
   }

   obtenerResidentes() {
    this.residentesService.mostrarResidentes().subscribe(
      (data: any) => {
        this.residentes = data.map((residente: any) => {
          residente.estado = residente.estado === 1 ? 'Activo' : 'Inactivo';
          return residente;
        });
      },
      (error) => {
        console.error('Error al obtener los residentes:', error);
      }
    );
  }

  obtenerResidentesVeh() {
    this.residentesService.mostrarVehiculos().subscribe(
      (data) => {
        this.vehiculos = data;
      },
      (error) => {
        console.error('Error al obtener los residentes:', error);
      }
    );
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  ngAfterViewInit() {
    if (this.edicionActiva && this.residenteEditando) {
      this.setInputsWidth();
    }
  }

  editarResidente(residente: any) {
    console.log('Editar residente:', residente);
    this.edicionActiva = true;
    this.residenteEditando = residente;
  }

  eliminarResidente(residente: any) {
    console.log('Eliminar residente:', residente);
    // Aquí puedes implementar la lógica para eliminar al residente de la estructura de datos
  }

  guardarCambios(residente: any) {
    // Aquí puedes realizar las acciones necesarias para guardar los cambios del residente
    // Por ejemplo, puedes llamar a un servicio para actualizar los datos en la base de datos
  
    // Una vez que se hayan guardado los cambios, puedes desactivar el modo de edición
    this.edicionActiva = false;
  }
  activarEdicion(residente: any) {
    this.edicionActiva = true;
    this.residenteEditando = residente;
  }
  setInputsWidth() {
    const rutInputWidth = this.rutInput
      .getInputElement()
      .then((inputElement) => inputElement.getBoundingClientRect().width);
    const dvInputWidth = this.dvInput
      .getInputElement()
      .then((inputElement) => inputElement.getBoundingClientRect().width);
    rutInputWidth.then((width) =>
      this.rutInput
        .getInputElement()
        .then((inputElement) => (inputElement.style.width = width + 'px'))
    );
    dvInputWidth.then((width) =>
      this.dvInput
        .getInputElement()
        .then((inputElement) => (inputElement.style.width = width + 'px'))
    );
  }
}
