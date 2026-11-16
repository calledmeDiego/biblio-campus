import { Component, computed, effect, input, output, signal } from '@angular/core';
import { Libro } from '../../models/libro';

@Component({
  selector: 'app-libro-card',
  imports: [],
  templateUrl: './libro-card.html',
  styleUrl: './libro-card.css',
})
export class LibroCard {
  
  libro = input.required<Libro>();
  prestamoSolicitado = output<Libro>();

  copias = signal(0);
  /**
   *
   */
  constructor() {
    effect(() => {
      this.copias.update(() => this.libro().copiasAvailables);
    })
  }
  protected agotado = computed(() => this.copias() === 0);
  protected etiqueta = computed(() =>
    this.agotado() ? 'Agotado' : `Disponible - ${this.copias()} ${this.copias() === 1 ? 'copia' : 'copias'}`);

  protected alSolicitar(): void {
    this.prestamoSolicitado.emit(this.libro());
  }
}
