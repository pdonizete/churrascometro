import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADMIN_GROUP, API_URL, HTTP_OPTIONS, NORMAL_GROUP } from '../models/constants/constants';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${API_URL}/login`, 
    { login: username, senha: password }, HTTP_OPTIONS)
  }

  logout(): Observable<void> {
    return this.http.get<void>(`${API_URL}/logout`);
  }

  isLoggedIn(): boolean {
    return this.storage.getToken() ? true : false;
  }

  isAdmin(): boolean {
    return this.storage.getPerfil() == ADMIN_GROUP; 
    // this.storage.getPerfil() == 'admin'
  }

  isNormal(): boolean {
    return this.storage.getPerfil() == NORMAL_GROUP;
    // this.storage.getPerfil() == 'normal'
  }
}
