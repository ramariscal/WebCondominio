import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResidentesService {
  private residentesEndPoint = 'residentes';
  private residentesVehEndPoint = 'residentevehiculos'

  constructor(
    private apiService: ApiService,
    private eventService: EventService,
  ) { }

  mostrarResidentes(): Observable<any> {
    return this.apiService.get(this.residentesEndPoint);
  }
  mostrarVehiculos(): Observable<any> {
    return this.apiService.get(this.residentesVehEndPoint);
  }
}
