import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AllinsformesService {
  private endpoint = 'empleados';

  constructor(private apiService: ApiService) { }
}
