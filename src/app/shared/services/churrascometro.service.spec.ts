import { TestBed } from '@angular/core/testing';

import { ChurrascometroService } from './churrascometro.service';
import { provideHttpClient } from '@angular/common/http';
import { Carnes } from '../models/carnes.interface';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ChurrascometroService', () => {
  let service: ChurrascometroService;
  let httpMock: HttpTestingController;

  // package npm para mocks: ng-mocks

  const mockCarnes: Carnes[] = [
    {
      id: '1',
      nome: 'Picanha',
      tipo: 'bovina',
      preco_kg: 70,
      consumo_medio_adulto_g: 300,
      consumo_medio_crianca_g: 100
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChurrascometroService]
    });
    service = TestBed.inject(ChurrascometroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('deve executar get carnes com sucesso', () => {
  //   service.getCarnes().subscribe(carnes => {
  //     expect(carnes).toEqual(mockCarnes);
  //   })

  //   const request = httpMock.expectOne(`${service['API_URL']}/carnes`);
  //   expect(request.request.method).toBe('GET');
  //   request.flush(mockCarnes);
  // });
});
