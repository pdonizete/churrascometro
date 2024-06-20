import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoFormularioComponent } from './produto-formulario.component';

describe('ProdutoFormularioComponent', () => {
  let component: ProdutoFormularioComponent;
  let fixture: ComponentFixture<ProdutoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
