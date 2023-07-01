import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { EventService } from 'src/app/Services/event.service';
import { Observable } from 'rxjs';
import { Comuna, Cargo, Empleado, Region } from 'src/app/models/empleado.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private empleadosEndPoint = 'empleados';
  private actualizarEndPoint = 'actualizarEmpleado';
  private cargosEndPoint = 'buscarCargos';
  private comunasEndPoint = 'buscarComunas';
  private regionesEndPoint = 'buscarRegiones';
  private buscarComunasPorRegionEndPoint = 'buscarComunasPorRegion'

  constructor(
    private apiService: ApiService, 
    private eventService: EventService, 
    private httpClient: HttpClient
  ) { }

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
  buscarComunasPorRegion(id_region: string): Observable<any> {
    const url = `${this.buscarComunasPorRegionEndPoint}/${id_region}`;
    return this.apiService.get(url);
  }  
  
}
