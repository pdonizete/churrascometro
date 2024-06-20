import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoChurrascoComponent } from './criacao-churrasco.component';

describe('CriacaoChurrascoComponent', () => {
  let component: CriacaoChurrascoComponent;
  let fixture: ComponentFixture<CriacaoChurrascoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriacaoChurrascoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriacaoChurrascoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
