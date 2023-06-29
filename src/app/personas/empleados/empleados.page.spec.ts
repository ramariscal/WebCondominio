import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadosPage } from './empleados.page';

describe('EmpleadosPage', () => {
  let component: EmpleadosPage;
  let fixture: ComponentFixture<EmpleadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpleadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
