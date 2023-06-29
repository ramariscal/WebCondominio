import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VisitasService {
  private visitadEndPoint = 'visitas'

  constructor(private apiService: ApiService) { }

    mostrarVisitas(): Observable<any> {
    return this.apiService.get(this.visitadEndPoint);
  }
}
