import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibroCard } from './components/libro-card/libro-card';
import { Navbar } from './components/navbar/navbar';
import { LibroLista } from './components/libro-lista/libro-lista';

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
}
