import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/models/partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private url = 'https://681042b927f2fdac2410be62.mockapi.io/api/partner'
  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  getById(id: number): Observable<Partner> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  create(data: Partial<Partner>): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  update(id: number, data: Partial<Partner>): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
