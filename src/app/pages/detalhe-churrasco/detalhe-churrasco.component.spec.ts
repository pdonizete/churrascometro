import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheChurrascoComponent } from './detalhe-churrasco.component';

describe('DetalheChurrascoComponent', () => {
  let component: DetalheChurrascoComponent;
  let fixture: ComponentFixture<DetalheChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
