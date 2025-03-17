import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/clientes.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements OnInit {
  clientes: any[] = [];
  currentPage: number = 1; // Página actual
  pageSize: number = 10;   // Cantidad de elementos por página
  
  // Propiedad para almacenar los datos del usuario
  usuario: any = {
    nombre: '',
    fecha_nacimiento: '',
    email: '',
    direccion: ''
  };

  nuevoUsuario = { nombre: '', fecha_nacimiento: '', email: '', direccion: '' };

  constructor(private clienteService: ClienteService,
              private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getClientes();
  }

  // Método para obtener clientes con paginación
  getClientes(): void {
    this.clienteService.getClientes(this.currentPage, this.pageSize).subscribe(
      (data) => {
        this.clientes = data.usuarios || []; // Asume que los datos vienen en una propiedad 'usuarios'
        console.log('Clientes obtenidos:', this.clientes);
      },
      (error) => {
        console.error('Error al obtener los clientes', error);
      }
    );
  }

  // Método para ir a la siguiente página
  nextPage(): void {
    this.currentPage++;
    this.getClientes();
  }

  // Método para ir a la página anterior
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getClientes();
    }
  }

  // Método para eliminar un cliente
  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.clienteService.eliminarCliente(id).subscribe(
        (response) => {
          console.log('Usuario eliminado:', response);
          // Vuelve a obtener los clientes después de la eliminación
          this.getClientes();
        },
        (error) => {
          console.error('Error al eliminar usuario:', error);
        }
      );
    }
  }
  
  // Método para agregar el nuevo usuario
  agregarUsuario() {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.email) {
      this.clienteService.agregarUsuario(this.nuevoUsuario).subscribe(
        () => {
          this.getClientes(); // Recargar la lista después de agregar
          this.nuevoUsuario = { nombre: '', fecha_nacimiento: '', email: '', direccion: '' }; // Limpiar formulario
          this.cerrarModal();
        },
        (error) => {
          console.error('Error al agregar usuario:', error);
        }
      );
    }
  }

  cerrarModal() {
    const modal = document.getElementById('exampleModal2') as HTMLElement;
    if (modal) {
      const modalCloseButton = modal.querySelector('.btn-close') as HTMLButtonElement;
      if (modalCloseButton) {
        modalCloseButton.click();
      }
    }
  }

  // Método para cargar los datos del usuario por ID
  cargarUsuarioPorId(id: number) {
    this.clienteService.obtenerUsuarioPorId(id).subscribe((data: any) => {
      this.usuario = data; // Asigna los datos del usuario al objeto 'usuario'
    });
  }

  // Método para guardar los cambios (puedes modificarlo para enviar los datos al backend)
  guardarCambios(form: any) {
      if (form.valid) {
        // Aquí puedes hacer la lógica para guardar los cambios, por ejemplo, haciendo una solicitud HTTP
        console.log('Datos del usuario actualizados:', this.usuario);
    
        // Llama a un servicio para guardar los cambios (suponiendo que tienes un servicio que se encarga de la actualización)
        this.clienteService.actualizarUsuario(this.usuario).subscribe(response => {
          console.log('Usuario actualizado:', response);
    
          // Recargar la tabla después de la actualización
          this.getClientes();
          
          // Cerrar el modal
        const modal = document.getElementById('exampleModal') as HTMLElement; // Asegúrate de que sea un HTMLElement
        if (modal) {
          const modalCloseButton = modal.querySelector('.btn-close') as HTMLButtonElement; // Asegúrate de que sea un HTMLButtonElement
          if (modalCloseButton) {
            modalCloseButton.click(); // Esto ahora funciona correctamente
          }
        }
      }, error => {
        console.error('Error al actualizar el usuario:', error);
      });
    }
  }
}