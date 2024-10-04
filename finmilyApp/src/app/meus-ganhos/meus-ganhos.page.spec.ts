import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeusGanhosPage } from './meus-ganhos.page';

describe('MeusGanhosPage', () => {
  let component: MeusGanhosPage;
  let fixture: ComponentFixture<MeusGanhosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusGanhosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
