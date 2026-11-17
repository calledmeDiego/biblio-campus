import { inject, Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import { LIBROS } from '../data/libros';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from '../api';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  //Copia del original

  private http = inject(HttpClient);

  private libros:Libro[] = LIBROS.map((l) => ({...l}));


  constructor() {
    console.log('LibroService creado');
  }

  // listar 
  listar(terminoBusqueda: string = ''): Observable<Libro[]> {
    const temp = terminoBusqueda.toLowerCase();

    let params = new HttpParams();

    if(temp) {
      params = params.set('q', temp);
    }

    return this.http.get<Libro[]>(`${API_URL}/libros`, { params });
  }

  obtener(id: number): Observable<Libro> {
    return this.http.get<Libro>(`${API_URL}/libros/${id}`);
  }

  // descontar copia
  descontarCopia(id: number): Observable<void> {
    this.libros = this.libros.map((l) => 
      l.id === id ? {...l, copiasAvailables: l.copiasAvailables - 1} : l
    )

    return of(undefined);
  }
  
}
