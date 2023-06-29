import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllinsformesPage } from './allinsformes.page';

describe('AllinsformesPage', () => {
  let component: AllinsformesPage;
  let fixture: ComponentFixture<AllinsformesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AllinsformesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
