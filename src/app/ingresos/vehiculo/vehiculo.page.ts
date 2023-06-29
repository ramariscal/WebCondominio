import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.page.html',
  styleUrls: ['./vehiculo.page.scss'],
})
export class VehiculoPage implements OnInit {
  public vehiculo = [
    {
      patente: 'NKB10',
      tipo_veh: 'Moto',
      color_veh: 'Negro',
      primer_nombre: 'Mauro',
      primer_apellido: 'Ortiz',
      id_departamento: '407',
      id_est: 'V1',
      tipo_est: 'Visita',
      tiempo_visita: '4 horas',
      veh_multa: 'No',
      fecha_ing: '16:43 23/06/2023',
      fecha_sal: '20:43 23/06/2023'
    },
    {
      patente: 'NXKD20',
      tipo_veh: 'Auto',
      color_veh: 'Rosa',
      primer_nombre: 'Esteban',
      primer_apellido: 'Mariscal',
      id_departamento: '310',
      id_est: 'V3',
      tipo_est: 'Visita',
      tiempo_visita: '7 horas',
      veh_multa: 'Sí',
      fecha_ing: '12:32 22/06/2023',
      fecha_sal: '19:32 22/06/2023'
    },
    // Agrega más empleados aquí...
  ];

  constructor() { }

  ngOnInit() {}


}
