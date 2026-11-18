import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibroCard } from './components/libro-card/libro-card';
import { Navbar } from './components/navbar/navbar';
import { LibroLista } from './components/libro-lista/libro-lista';
import { PrestamoService } from './servicios/prestamo-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LibroLista,
    Navbar
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bibliocampus');
  constructor() {
    inject(PrestamoService).cargarMios();
  }
}
