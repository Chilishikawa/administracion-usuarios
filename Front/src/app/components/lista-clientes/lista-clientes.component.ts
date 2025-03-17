import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/clientes.service';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ClienteListComponent implements OnInit {
  clientes: any[] = [];
  paginaActual: number = 1;
  totalPaginas: number = 1;
  tamanioPagina: number = 10;
  metodo: any;
  paginaActualL: number = 1;
  totalPaginasL: number = 1;
  tamanioPaginaL: number = 10;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
  }

  obtenerClientesSP(): void {
    this.metodo = "SP";
    this.clienteService.getClientesSP(this.paginaActual, this.tamanioPagina).subscribe(response => {
      this.clientes = response.clientes;
      this.totalPaginas = response.totalPaginas;
    });
  }

  obtenerClientesLINQ(): void {
    this.metodo = "LINQ";
    this.clienteService.getClientesLINQ(this.paginaActualL, this.tamanioPaginaL).subscribe(response => {
      this.clientes = response.clientes;
      this.totalPaginasL = response.totalPaginas;
    });
  }

  cambiarPaginaSP(nuevaPagina: number): void {
    if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
      this.paginaActual = nuevaPagina;

      this.obtenerClientesSP();
    }
  }

  cambiarPaginaLINQ(nuevaPaginaL: number): void {
    if (nuevaPaginaL >= 1 && nuevaPaginaL <= this.totalPaginasL) {
      this.paginaActualL = nuevaPaginaL;

      this.obtenerClientesLINQ();
    }
  }
}
