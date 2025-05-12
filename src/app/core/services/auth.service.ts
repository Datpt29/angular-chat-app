import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get<any>('https://681042b927f2fdac2410be62.mockapi.io/api/auth');
  }


}
