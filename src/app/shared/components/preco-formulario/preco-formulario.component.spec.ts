import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecoFormularioComponent } from './preco-formulario.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('PrecoFormularioComponent', () => {
  let component: PrecoFormularioComponent;
  let fixture: ComponentFixture<PrecoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecoFormularioComponent],
      providers: [provideHttpClient(), provideAnimations()]
      // providers: [HttpClientTestingModule]
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
