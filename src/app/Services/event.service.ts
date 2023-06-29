import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiResponseSubject = new Subject<any>();

  // Observable que puedes suscribirte para recibir las respuestas de la API
  public apiResponse$ = this.apiResponseSubject.asObservable();

  constructor() { }

  emitApiResponse(response: any) {
    // Emitir el evento con la respuesta
    this.apiResponseSubject.next(response);
  }
}
