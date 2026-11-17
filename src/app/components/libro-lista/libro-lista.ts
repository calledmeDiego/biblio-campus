import { Component, computed, effect, inject, signal } from '@angular/core';
import { LibroCard } from '../libro-card/libro-card';
import { Libro } from '../../models/libro';
import { LIBROS } from '../../data/libros';
import { LibroService } from '../../servicios/libro-service';
import { PrestamoService } from '../../servicios/prestamo-service';

@Component({
  selector: 'app-libro-lista',
  imports: [LibroCard],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css',
})
export class LibroLista {
  private libroService = inject(LibroService);
  private prestamoService = inject(PrestamoService);
  
  protected libros = signal<Libro[]>([]);
  protected terminoBusqueda = signal('');

  protected borrador = signal('');
  protected cargando = signal(true);
  protected mensaje = signal<string|null>(null);

  protected error = signal(false);

  /**
   *
   */
  constructor() {
    effect(() => {
      this.cargar()
    })   
  }

  // PIDE LOS LIBROS AL SERVICIO
  protected cargar(): void {
    this.cargando.set(true);
    this.error.set(false);
    this.libroService.listar(this.terminoBusqueda()).subscribe({
      next: (data) => {
        this.libros.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set(true);
        this.cargando.set(false);
      }
    })
  }

  protected alEscribir(evento: Event): void {
    this.borrador.set((evento.target as HTMLInputElement).value);
  }
  protected alBuscar(): void {
    this.terminoBusqueda.set(this.borrador().trim());
  }

  protected alSolicitar(libro: Libro): void {
    // Actualizar las copias disponibles
    this.prestamoService.solicitar(libro).subscribe(() => {
      this.mensaje.set(`Solicitaste ${libro.title}`);
      this.cargar();
    });

  }
}
