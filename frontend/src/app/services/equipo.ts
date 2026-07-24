import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, catchError } from 'rxjs';

export interface Equipo {
  codigo: string;
  nombre: string;
  categoria: string;
  laboratorio: string;
  estado: string;
  responsable: string;
}

@Injectable({ providedIn: 'root' })
export class EquipoService {
  private apiUrl = 'http://localhost:3000/api/equipos';

  constructor(private http: HttpClient) {}

  // Consulta todos los equipos y guarda copia local para modo Offline
  getEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl).pipe(
      tap(data => localStorage.setItem('equipos_cache', JSON.stringify(data))),
      catchError(() => {
        const cached = localStorage.getItem('equipos_cache');
        return of(cached ? JSON.parse(cached) : []);
      })
    );
  }

  // Consultar por código
  getEquipoPorCodigo(codigo: string): Observable<Equipo> {
    return this.http.get<Equipo>(`${this.apiUrl}/${codigo}`);
  }

  // Registrar un equipo
  registrarEquipo(equipo: Equipo): Observable<any> {
    return this.http.post(this.apiUrl, equipo);
  }

  // Actualizar estado
  actualizarEstado(codigo: string, estado: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${codigo}/estado`, { estado });
  }
}