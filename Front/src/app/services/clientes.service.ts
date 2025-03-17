import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  // URL de la API
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  // Método para obtener clientes con paginación
  getClientes(page: number = 1, size: number = 10): Observable<any> {
    // Construye la URL con los parámetros de paginación
    const url = `${this.apiUrl}?page=${page}&size=${size}`;
    return this.http.get<any>(url);
  }

  // Método para eliminar un cliente
  eliminarCliente(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }
  
  // Obtener usuario por ID
  obtenerUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar usuario
  actualizarUsuario(usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  agregarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/agregar`, usuario);
  }
}
