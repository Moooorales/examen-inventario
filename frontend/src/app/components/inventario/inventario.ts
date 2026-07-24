import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipoService, Equipo } from '../../services/equipo';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrls: ['./inventario.css']
})
export class InventarioComponent implements OnInit {
  equipos: Equipo[] = [];
  busquedaCodigo: string = '';
  
  nuevoEquipo: Equipo = {
    codigo: '', nombre: '', categoria: '', laboratorio: '', estado: 'Disponible', responsable: ''
  };

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    this.cargarEquipos();
  }

  cargarEquipos(): void {
    this.equipoService.getEquipos().subscribe({
      next: (data) => this.equipos = data,
      error: (err) => console.error('Error al cargar equipos:', err)
    });
  }

  buscar(): void {
    if (!this.busquedaCodigo.trim()) {
      this.cargarEquipos();
      return;
    }
    this.equipoService.getEquipoPorCodigo(this.busquedaCodigo).subscribe({
      next: (res) => this.equipos = [res],
      error: () => alert('Equipo no encontrado')
    });
  }

  guardar(): void {
    this.equipoService.registrarEquipo(this.nuevoEquipo).subscribe(() => {
      this.cargarEquipos();
      this.nuevoEquipo = { codigo: '', nombre: '', categoria: '', laboratorio: '', estado: 'Disponible', responsable: '' };
    });
  }

  cambiarEstado(codigo: string, nuevoEstado: string): void {
    this.equipoService.actualizarEstado(codigo, nuevoEstado).subscribe(() => {
      this.cargarEquipos();
    });
  }
}