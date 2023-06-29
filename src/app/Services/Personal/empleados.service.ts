import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { EventService } from 'src/app/Services/event.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private empleadosEndPoint = 'empleados';
  private actualizarEndPoint = 'actualizarEmpleado';
  private cargosEndPoint = 'buscarCargos';
  private comunasEndPoint = 'buscarComunas';
  private regionesEndPoint = 'buscarRegiones';

  constructor(private apiService: ApiService, private eventService: EventService) { }

  mostrarEmpleados(): Observable<any> {
    return this.apiService.get(this.empleadosEndPoint);
  }

  actualizarEmpleado(rut: string, datosEmpleado: any): Observable<any> {
    const url = `${this.actualizarEndPoint}/${rut}`;
    return this.apiService.put(url, datosEmpleado);
  }

  obtenerCargos(): Observable<any> {
    return this.apiService.get(this.cargosEndPoint);
  }

  obtenerComunas(): Observable<any> {
    return this.apiService.get(this.comunasEndPoint);
  }

  obtenerRegiones(): Observable<any> {
    return this.apiService.get(this.regionesEndPoint);
  }
}
