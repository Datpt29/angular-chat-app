import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get<any>('https://681042b927f2fdac2410be62.mockapi.io/api/users');
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>('https://681042b927f2fdac2410be62.mockapi.io/api/users/' + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>('https://681042b927f2fdac2410be62.mockapi.io/api/users/' + id);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>('https://681042b927f2fdac2410be62.mockapi.io/api/users', data);
  }

  update(data: any): Observable<any> {
    return this.http.put<any>('https://681042b927f2fdac2410be62.mockapi.io/api/users', data);
  }
}
