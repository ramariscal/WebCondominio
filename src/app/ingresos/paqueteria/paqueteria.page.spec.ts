import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaqueteriaPage } from './paqueteria.page';

describe('PaqueteriaPage', () => {
  let component: PaqueteriaPage;
  let fixture: ComponentFixture<PaqueteriaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaqueteriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
