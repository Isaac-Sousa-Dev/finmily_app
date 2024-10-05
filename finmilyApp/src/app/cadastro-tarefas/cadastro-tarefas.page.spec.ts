import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastroTarefasPage } from './cadastro-tarefas.page';

describe('CadastroTarefasPage', () => {
  let component: CadastroTarefasPage;
  let fixture: ComponentFixture<CadastroTarefasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
