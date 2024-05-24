import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Carnes } from '../models/carnes.interface';
import { Bebidas } from '../models/bebidas.interface';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  private API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCarnes(): Observable<Carnes[]> {
    return this.http.get<Carnes[]>(`${this.API_URL}/carnes`).pipe(
      catchError(this.handlerError)
    )
  }

  getBebidas(): Observable<Bebidas[]> {
    return this.http.get<Bebidas[]>(`${this.API_URL}/bebidas`).pipe(
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ' + error);
    return throwError(() => error);
  }


  // private getPrecoCarneByName(nome: string): Observable<number> {
  //   return this.http.get<any[]>(`${this.API_URL}/carnes`).
  //     pipe(
  //       map(carnes => {
  //         const carne = carnes.find((carne: { nome: string }) => carne.nome === nome);

  //         if (carne) {
  //           return carne.preco_kg;
  //         }
  //       }),
  //       catchError(
  //         this.handlerError
  //       )
  //     );
  // }

  // getPrecoPicanha(): Observable<number> {
  //   return this.getPrecoCarneByName('picanha');
  // }
}
