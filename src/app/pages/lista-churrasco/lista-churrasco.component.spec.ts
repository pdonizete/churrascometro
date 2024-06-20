import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChurrascoComponent } from './lista-churrasco.component';

describe('ListaChurrascoComponent', () => {
  let component: ListaChurrascoComponent;
  let fixture: ComponentFixture<ListaChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
