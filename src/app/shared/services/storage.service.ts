import { Injectable } from '@angular/core';
import { PERFIL_KEY, TOKEN_KEY, USER_KEY } from '../models/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public getToken(): any {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
    return null;
  }

  private setToken(token: string): void {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  private removeToken(): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  public getUser(): any {
    return window.sessionStorage.getItem(USER_KEY);
  }

  private setUser(user: string): void {
    window.sessionStorage.setItem(USER_KEY, user);
  }

  private removeUser(): void {
    window.sessionStorage.removeItem(USER_KEY);
  }

  public getPerfil(): any {
    return window.sessionStorage.getItem(PERFIL_KEY);
  }

  private setPerfil(perfil: string): void {
    window.sessionStorage.setItem(PERFIL_KEY, perfil);
  }

  private removePerfil(): void {
    window.sessionStorage.removeItem(PERFIL_KEY);
  }

  public doLogin(token: string, user: string, perfil: string): void {
    this.setToken(token);
    this.setUser(user);
    this.setPerfil(perfil);
  }

  public doLogout(): void {
    this.removeToken();
    this.removeUser();
    this.removePerfil();
  }
}
