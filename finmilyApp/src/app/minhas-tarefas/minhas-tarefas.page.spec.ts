import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MinhasTarefasPage } from './minhas-tarefas.page';

describe('MinhasTarefasPage', () => {
  let component: MinhasTarefasPage;
  let fixture: ComponentFixture<MinhasTarefasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MinhasTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
