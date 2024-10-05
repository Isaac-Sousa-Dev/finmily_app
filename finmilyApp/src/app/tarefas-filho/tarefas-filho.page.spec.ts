import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarefasFilhoPage } from './tarefas-filho.page';

describe('TarefasFilhoPage', () => {
  let component: TarefasFilhoPage;
  let fixture: ComponentFixture<TarefasFilhoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TarefasFilhoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
