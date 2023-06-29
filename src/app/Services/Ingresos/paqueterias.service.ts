import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaqueteriasService {
  private mostrarPaqueteriasEndPoint = 'ObtenerPaqueterias'

  constructor(
    private apiService: ApiService,
    private eventService: EventService,
  ) { }

  mostrarPaqueterias(): Observable<any> {
    return this.apiService.get(this.mostrarPaqueteriasEndPoint);
  }
}
