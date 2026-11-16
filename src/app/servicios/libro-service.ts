import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';
import { LIBROS } from '../data/libros';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  //Copia del original

  private libros:Libro[] = LIBROS.map((l) => ({...l}));


  constructor() {
    console.log('LibroService creado');
  }

  // listar 
  listar(terminoBusqueda: string = ''): Observable<Libro[]> {
    const temp = terminoBusqueda.toLowerCase();

    const lista = this.libros.filter(
      (libro) => !temp || libro.title.toLowerCase().includes(temp) || libro.author.toLowerCase().includes(temp)
    )

    return of(lista);
  }

  // descontar copia
  descontarCopia(id: number): Observable<void> {
    this.libros = this.libros.map((l) => 
      l.id === id ? {...l, copiasAvailables: l.copiasAvailables - 1} : l
    )

    return of(undefined);
  }
  
}
