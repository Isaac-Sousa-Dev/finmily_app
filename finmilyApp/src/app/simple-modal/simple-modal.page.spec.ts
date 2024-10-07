import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleModalPage } from './simple-modal.page';

describe('SimpleModalPage', () => {
  let component: SimpleModalPage;
  let fixture: ComponentFixture<SimpleModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
