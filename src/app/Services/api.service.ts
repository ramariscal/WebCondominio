import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Reemplaza la URL por la correcta de tu API

  constructor(private http: HttpClient, private eventService: EventService) { }

  get(endpoint: string, params?: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.get(url, { params }).pipe(
      tap((response) => {
        // Emitir el evento con la respuesta
        this.eventService.emitApiResponse(response);
      })
    );
  }

  post(endpoint: string, body: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.post(url, body).pipe(
      tap((response) => {
        // Emitir el evento con la respuesta
        this.eventService.emitApiResponse(response);
      })
    );
  }
  
  put(endpoint: string, body: any): Observable<any> {
    const url = `${this.apiUrl}/${endpoint}`;
    return this.http.put(url, body).pipe(
      tap((response) => {
        // Emitir el evento con la respuesta
        this.eventService.emitApiResponse(response);
      })
    );
  }

  authenticate(usuario: string, clave: string): Observable<any> {
    const url = `${this.apiUrl}/authenticate`; // URL para la autenticación, ajusta según tu API
    const body = {
      usuario: usuario,
      clave: clave
    };

    return this.http.post(url, body).pipe(
      tap((response) => {
        // Emitir el evento con la respuesta
        this.eventService.emitApiResponse(response);
      })
    );
  }

  agregarEmpleado(empleadoData: any): Observable<any> {
    const endpoint = 'agregarEmpleado';
    return this.http.post(endpoint, empleadoData).pipe(
      tap((response) => {
        // Emitir el evento con la respuesta
        this.eventService.emitApiResponse(response);
      })
    );
  }

  agregarResidente(residenteData: any): Observable<any> {
    const endpoint = 'agregarResidente';
    return this.http.post(endpoint, residenteData).pipe(
      tap((response) => {
        // Emitir el evento con la respuesta
        this.eventService.emitApiResponse(response);
      })
    );
  }
  

  // Agrega más métodos según tus necesidades (put, delete, etc.)
}
