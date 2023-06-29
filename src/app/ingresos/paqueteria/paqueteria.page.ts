import { Component, OnInit } from '@angular/core';
import { PaqueteriasService } from 'src/app/Services/Ingresos/paqueterias.service';
import { ModalController } from '@ionic/angular';
import { VerfotopedidoComponent } from 'src/app/verfotopedido/verfotopedido.component';
import { PdfService } from 'src/app/Services/pdf.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-paqueteria',
  templateUrl: './paqueteria.page.html',
  styleUrls: ['./paqueteria.page.scss'],
})
export class PaqueteriaPage implements OnInit {
  public paqueterias: any[] = [];
  public selectedPaqueteria: any[] = [];
  showModal: boolean = false;
  pdfData: string | undefined;

  constructor(
    private paqueteriaService: PaqueteriasService,
    private modalController: ModalController,
    private pdfService: PdfService
  ) { }

  ngOnInit() {
    this.obtenerPaqueterias();
  }

  ionViewDidEnter(){
    this.obtenerPaqueterias();
  }

  obtenerPaqueterias() {
    this.paqueteriaService.mostrarPaqueterias().subscribe(
      (data) => {
        this.paqueterias = data;
      },
      (error) => {
        console.error('Error al obtener paqueterias:', error);
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

  evidencia(paqueteria: any[]) {
    this.selectedPaqueteria = paqueteria;
  
    console.log(this.generarPDF);
  }

  async openModal(paqueteria: any) {
    this.selectedPaqueteria = paqueteria;
    const modal = await this.modalController.create({
      component: VerfotopedidoComponent,
      componentProps: {
        paqueteria: this.selectedPaqueteria
      }
    });
    await modal.present();
  }

  closeModal() {
    this.showModal = false;
  }

  generarPDF() {
    this.pdfService.generarPDF(this.paqueterias).subscribe(
      (blob: Blob) => {
        const blobURL = URL.createObjectURL(blob);
        window.open(blobURL); // Abre una nueva pestaña con el PDF
      },
      (error) => {
        console.error('Error al generar el PDF', error);
      }
    );
  }
}
