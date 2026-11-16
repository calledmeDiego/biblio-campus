import { Libro } from "../models/libro";

export const LIBROS: Libro[] = [
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Buenas prácticas', year: 2008, portadaUrl: '', copiasAvailables: 3 },
    { id: 2, title: 'Effective Java', author: 'Joshua Bloch', category: 'Java', year: 2018, portadaUrl: '', copiasAvailables: 5 },
    { id: 3, title: 'Spring in Action', author: 'Craig Walls', category: 'Spring', year: 2022, portadaUrl: '', copiasAvailables: 0 },
    { id: 4, title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides', category: 'Patrones de diseño', year: 1994, portadaUrl: '', copiasAvailables: 2 },
    { id: 5, title: 'Refactoring', author: 'Martin Fowler', category: 'Buenas prácticas', year: 2018, portadaUrl: '', copiasAvailables: 0 },
    { id: 6, title: 'The Pragmatic Programmer', author: 'Hunt y Thomas', category: 'Buenas prácticas', year: 2019, portadaUrl: '', copiasAvailables: 4 },
];