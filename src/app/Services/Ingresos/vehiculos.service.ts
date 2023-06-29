import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { EventService } from 'src/app/Services/event.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private vehVisitasEndPoint = 'vehVisitas';

  constructor(
    private apiService: ApiService,
    ) {}

    mostrarVehVisitas(): Observable<any> {
      return this.apiService.get(this.vehVisitasEndPoint);
    }
}
