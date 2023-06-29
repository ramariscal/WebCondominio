import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'src/app/Services/Ingresos/vehiculos.service';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  public vehiculo: any[] = [];

  constructor(
    private vehiculosService: VehiculosService,
  ) { }

  ngOnInit() {
    this.obtenetVehVisitas();
  }

  obtenetVehVisitas() {
    this.vehiculosService.mostrarVehVisitas().subscribe(
      (data: any) => {
        this.vehiculo = data.map((vehiculo: any) => {
          vehiculo.estatus = vehiculo.estatus === 1 ? 'No' : 'Sí';
          return vehiculo;
        });
      },
      (error: any) => {
        console.error('Error al obtener vehiculos de visitas:', error)
      }
    )
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }

  calcularDuracion(fechaIngreso: string, fechaSalida: string): string {
    const ingreso = new Date(fechaIngreso);
    const salida = new Date(fechaSalida);
  
    const diffMillis = Math.abs(salida.getTime() - ingreso.getTime());
    const diffMinutes = Math.floor(diffMillis / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
  
    return `${diffHours} horas, ${remainingMinutes} minutos`;
  }  
}
