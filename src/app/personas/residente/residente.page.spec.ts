import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResidentePage } from './residente.page';

describe('ResidentePage', () => {
  let component: ResidentePage;
  let fixture: ComponentFixture<ResidentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResidentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
