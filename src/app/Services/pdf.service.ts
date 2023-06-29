import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  generarPDF(datos: any[]): Observable<any> {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    const documentDefinition: any = {
      content: [] as any[], // Tipo explícito para el arreglo content
    };

    datos.forEach((item) => {
      documentDefinition.content.push([{ text: `ID de pedido: ${item.id_pedido}`, bold: true }]);
      documentDefinition.content.push([{ text: `Fecha de recepción: ${item.fecha_recepcion}` }]);
      documentDefinition.content.push([{ text: `Fecha de entrega: ${item.fecha_entrega}` }]);

      if (item.evidencia_recepcion) {
        const imagenRecepcion = item.evidencia_recepcion;
        documentDefinition.content.push([{ image: imagenRecepcion, width: 200, height: 200 }]);
      }

      if (item.evidencia_entrega) {
        const imagenEntrega = item.evidencia_entrega;
        documentDefinition.content.push([{ image: imagenEntrega, width: 200, height: 200 }]);
      }

      documentDefinition.content.push([{ text: '---------------------------' }]);
    });

    return new Observable((observer) => {
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
      pdfDocGenerator.getBlob((blob) => {
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
