import { Component } from '@angular/core';
import { InventarioComponent } from './components/inventario/inventario';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InventarioComponent],
  template: `<app-inventario></app-inventario>`
})
export class App {}