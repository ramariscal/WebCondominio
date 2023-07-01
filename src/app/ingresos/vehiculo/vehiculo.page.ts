import { Component, OnInit } from '@angular/core';
import { VehiculosService } from 'src/app/Services/Ingresos/vehiculos.service';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  public vehiculo: any[] = [];

  constructor(private vehiculosService: VehiculosService) {}

  ngOnInit() {
    this.obtenetVehVisitas();
  }

  obtenetVehVisitas() {
    this.vehiculosService.mostrarVehVisitas().subscribe(
      (data: any) => {
        this.vehiculo = data.map((vehiculo: any) => {
          vehiculo.estatus = vehiculo.fecha_sal && vehiculo.fecha_ing
            ? this.calcularDuracion(vehiculo.fecha_ing, vehiculo.fecha_sal) > '5 horas, 00 minutos' ? 'Sí' : 'No'
            : 'S/R';
          vehiculo.fecha_ing = vehiculo.fecha_ing || null;
          vehiculo.fecha_sal = vehiculo.fecha_sal || null;
          vehiculo.fecha_ing_format = vehiculo.fecha_ing ? this.formatDate(vehiculo.fecha_ing) : 'S/R';
          vehiculo.fecha_sal_format = vehiculo.fecha_sal ? this.formatDate(vehiculo.fecha_sal) : 'S/R';
          vehiculo.tiempo_visita =
            vehiculo.fecha_sal && vehiculo.fecha_ing
              ? this.calcularDuracion(vehiculo.fecha_ing, vehiculo.fecha_sal)
              : 'S/R';
          return vehiculo;
        });
  
        this.vehiculo.sort((a: any, b: any) => {
          return b.id_visita - a.id_visita;
        });
      },
      (error: any) => {
        console.error('Error al obtener vehiculos de visitas:', error);
      }
    );
  }
  
  

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'S/R';
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  }

  calcularDuracion(fechaIngreso: string, fechaSalida: string): string {
    const ingreso = new Date(fechaIngreso);
    const salida = new Date(fechaSalida);
  
    if (isNaN(ingreso.getTime()) || isNaN(salida.getTime())) {
      return 'S/R';
    }
  
    const diffMillis = Math.abs(salida.getTime() - ingreso.getTime());
    const diffMinutes = Math.floor(diffMillis / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
  
    return `${diffHours} horas, ${remainingMinutes} minutos`;
  }
}
