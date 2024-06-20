import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Carnes } from '../models/carnes.interface';
import { Bebidas } from '../models/bebidas.interface';
import { API_URL } from '../models/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ChurrascometroService {

  // private API_URL = 'http://localhost:3000';

  private carnes = signal<Carnes[]>([]);
  public getCarnes = this.carnes.asReadonly();

  private bebidas = signal<Bebidas[]>([]);
  public getBebidas = this.bebidas.asReadonly();

  private produto = signal<any | null>(null);
  public getProduto = this.produto.asReadonly();

  constructor(private http: HttpClient) { }

  httpGetCarnes(): Observable<Carnes[]> {
    return this.http.get<Carnes[]>(`${API_URL}/carnes`).pipe(
      tap((carnes) => {
        this.carnes.set(carnes)
      }),
      catchError(this.handlerError)
    );
  }

  httpGetBebidas(): Observable<Bebidas[]> {
    return this.http.get<Bebidas[]>(`${API_URL}/bebidas`).
    pipe(
      tap((bebidas) => {
        this.bebidas.set(bebidas);
      }),
      catchError(this.handlerError)
    )
  }

  httpCreateProduto(carne: any, endpoint: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/${endpoint}`, carne).pipe(
      tap((produto: any) => {
        this.produto.set(produto); 
      }),
      catchError(this.handlerError)
    )
  }

  httpGetProduto(id: string, endpoint: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/${endpoint}/${id}`).pipe(
      tap((produto: any) => {
        this.produto.set(produto);
      }),
      catchError(this.handlerError)
    )
  }

  httpUpdateNomeProduto(id: string, nome: string, endpoint:string): Observable<any> {
    return this.http.patch<any>(`${API_URL}/${endpoint}/${id}`, { 'nome': nome })
    .pipe(
      tap((produto: any) => {
        this.produto.set(produto);
      }),
      catchError(this.handlerError)
    )
  }

  httpUpdateProduto(id: string, endpoint: string, produto: any): Observable<any> {
    return this.http.put<any>(`${API_URL}/${endpoint}/${id}`, produto).pipe(
      tap((produto: any) => {
        this.produto.set(produto);
      }),
      catchError(this.handlerError)
    )
  }

  httpDeleteProduto(id: string, endpoint: string): Observable<any> {
    return this.http.delete<void>(`${API_URL}/${endpoint}/${id}`).pipe(
      tap(() => {
        this.produto.set(null);
      }),
      catchError(this.handlerError)
    )
  }

  private handlerError(error: HttpErrorResponse): Observable<any> {
    console.log('Ocorreu um erro: ', error);
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
