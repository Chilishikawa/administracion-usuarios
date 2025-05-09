import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteListComponent } from './lista-clientes.component';

describe('ListaClientesComponent', () => {
  let component: ClienteListComponent;
  let fixture: ComponentFixture<ClienteListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteListComponent]
    });
    fixture = TestBed.createComponent(ClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
