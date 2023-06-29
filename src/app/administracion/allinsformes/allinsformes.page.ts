import { Component, OnInit } from '@angular/core';

interface Multa {
  id_multa: string;
  monto: string;
  status: string;
  id_departamento: string;
  id_edificio: string;
  id_conjunto: string;
  buttonText: string;
}

@Component({
  selector: 'app-allinsformes',
  templateUrl: './allinsformes.page.html',
  styleUrls: ['./allinsformes.page.scss'],
})
export class AllinsformesPage implements OnInit {
  public multas: Multa[] = [
    {
      id_multa: '001',
      monto: '50.000',
      status: 'Deuda',
      id_departamento: '207',
      id_edificio: '5',
      id_conjunto: 'Lomas del Parque',
      buttonText: 'Pagar',
    },
    {
      id_multa: '002',
      monto: '80.000',
      status: 'Deuda',
      id_departamento: '403',
      id_edificio: '2',
      id_conjunto: 'Lomas del Parque',
      buttonText: 'Pagar',
    },
  ];

  constructor() { }

  ngOnInit() {}

  toggleStatus(multa: Multa) {
    if (multa.status === 'Deuda') {
      multa.status = 'Pagado';
      multa.buttonText = 'Revertir';
    } else if (multa.status === 'Pagado') {
      multa.status = 'Deuda';
      multa.buttonText = 'Pagar';
    }
  }
}
