import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoFormularioComponent } from './preco-formulario.component';

describe('PrecoFormularioComponent', () => {
  let component: PrecoFormularioComponent;
  let fixture: ComponentFixture<PrecoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrecoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
