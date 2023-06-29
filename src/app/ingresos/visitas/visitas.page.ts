import { Component, OnInit } from '@angular/core';
import { VisitasService } from 'src/app/Services/Ingresos/visitas.service';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {
public visitas: any [] = [];
  constructor(private visitasService: VisitasService) { }

  ngOnInit() {
    this.obtenerVisitas();
  }

  obtenerVisitas() {
    this.visitasService.mostrarVisitas().subscribe(
      (data: any) => {
        this.visitas = data.map((visita: any) => {
          if (visita.patente === null) {
            visita.patente = 'N/A';
          }
          if (visita.id_est === null) {
            visita.id_est = 'N/A';
          }
          return visita;
        });
      },
      (error: any) => {
        console.error('Error al obtener Visitas:', error);
      }
    );
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

}