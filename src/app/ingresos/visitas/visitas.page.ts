import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.page.html',
  styleUrls: ['./visitas.page.scss'],
})
export class VisitasPage implements OnInit {
  public visita = [
    {
      rut_visita: '25679439',
      dv: '2',
      nombre: 'Aniuska',
      apellido: 'Ojeda',
      patente: 'BRBR-89',
      id_est: 'V4',
      id_departamento: '417',
      id_edificio: '5',
      id_conjunto: 'C. Lomas',
      fecha_ing: '18:00 22/06/2023',
      fecha_sal: '16:43 23/06/2023'
    },
    {
      rut_visita: '19346372',
      dv: '5',
      nombre: 'Raúl',
      apellido: 'Mariscal',
      patente: 'N/A',
      id_est: 'N/A',
      id_departamento: '417',
      id_edificio: '5',
      id_conjunto: 'C. Lomas',
      fecha_ing: '18:00 22/06/2023',
      fecha_sal: '16:43 23/06/2023'
    },
    // Agrega más empleados aquí...
  ];
  constructor() { }

  ngOnInit() {}
  exportarVisita(visita: any) {
    console.log('Exportar visita:', visita);
    // Aquí puedes abrir un modal o redireccionar a una página de edición
  }

}