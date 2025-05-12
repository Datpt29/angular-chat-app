import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://reqres.in/api/users';
  private apiKey = 'reqres-free-v1';

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get<any>(`${this.url}?api_key=${this.apiKey}`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<any>(`${this.url}/${id}?api_key=${this.apiKey}`);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}?api_key=${this.apiKey}`, { observe: 'response' });
  }

  create(data: Partial<User>): Observable<any> {
    return this.http.post<any>(`${this.url}?api_key=${this.apiKey}`, data, { observe: 'response' });
  }

  update(id: number, data: Partial<User>): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}?api_key=${this.apiKey}`, data, { observe: 'response' });
  }
}
