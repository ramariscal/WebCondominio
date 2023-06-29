import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-verfotopedido',
  templateUrl: './verfotopedido.component.html',
  styleUrls: ['./verfotopedido.component.scss'],
})
export class VerfotopedidoComponent implements OnInit {
  @Input() paqueteria: any;

  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }
}
