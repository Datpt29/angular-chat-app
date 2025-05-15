import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private url = 'https://reqres.in/api/login';
  private apiKey = 'reqres-free-v1';
  login(data: Partial<User>): Observable<any> {
    return this.http.post(`${this.url}?api_key=${this.apiKey}`, data, { observe: 'response' });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
