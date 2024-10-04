import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilhosPage } from './filhos.page';

describe('FilhosPage', () => {
  let component: FilhosPage;
  let fixture: ComponentFixture<FilhosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilhosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
