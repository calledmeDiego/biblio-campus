import { computed, inject, Injectable, signal } from '@angular/core';
import { LibroService } from './libro-service';
import { Prestamo } from '../models/prestamo';
import { Libro } from '../models/libro';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PrestamoService {

  private http = inject(HttpClient);
  private libroService = inject(LibroService);
  // la unica forma de acceder al arreglo es mediante funciones
  private _prestamos = signal<Prestamo[]>([]);
  // metodos de solo lectura para mostrar info
  readonly prestamos = this._prestamos.asReadonly();
  readonly activos = computed(() => this._prestamos().filter((prestamo) => prestamo.estado === 'ACTIVO').length);

  cargarMios(): void {
    this.http.get<Prestamo[]>(`${API_URL}/prestamos/mios`).subscribe({
      next: (data) => {
        this._prestamos.set(data)
      },
      error: () => this._prestamos.set([])
    })
  }

  //Solicitar prestamo
  solicitar(libro: Libro): Observable<Prestamo> {
    return this.http.post<Prestamo>(`${API_URL}/prestamos`, {libroId: libro.id}).
    pipe(
      tap((prestamo) => this._prestamos.update((prestamosActuales) => [...prestamosActuales, prestamo]))
    )    
  }

}
