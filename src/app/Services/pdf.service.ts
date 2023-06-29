import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generarPDF(datos: any[]): Observable<any> {
    if (!Array.isArray(datos)) {
      console.error('Los datos proporcionados no son un arreglo.');
      return new Observable((observer) => {
        observer.error('Los datos proporcionados no son un arreglo.');
        observer.complete();
      });
    }
  
    const selectedPaqueteria: any[] = [];
  
    datos.forEach((item) => {
      selectedPaqueteria.push({ text: `ID de pedido: ${item.id_pedido}`, bold: true });
      selectedPaqueteria.push({ text: `Fecha de recepción: ${item.fecha_recepcion}` });
      selectedPaqueteria.push({ text: `Fecha de entrega: ${item.fecha_entrega}` });
  
      if (item.evidencia_recepcion) {
        const imagenRecepcion = item.evidencia_recepcion;
        selectedPaqueteria.push({ image: imagenRecepcion, width: 200, height: 200 });
      }
  
      if (item.evidencia_entrega) {
        const imagenEntrega = item.evidencia_entrega;
        selectedPaqueteria.push({ image: imagenEntrega, width: 200, height: 200 });
      }
  
      selectedPaqueteria.push({ text: '---------------------------' });
    });
  
    const documentDefinition = {
      content: selectedPaqueteria,
    };
  
    return new Observable((observer) => {
      pdfMake.createPdf(documentDefinition).getBlob((blob: Blob) => {
        observer.next(blob);
        observer.complete();
      });
    });
  }

  descargarPDF(blob: Blob, nombreArchivo: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
