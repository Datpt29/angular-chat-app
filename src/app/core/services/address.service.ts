import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  private url = 'https://provinces.open-api.vn/api';

  getProvinces() {
    return this.http.get<any[]>(`${this.url}/p/`);
  }

  getDistricts(provinceCode: number) {
    return this.http.get<any>(`${this.url}/p/${provinceCode}?depth=2`);
  }

  getWards(districtCode: number) {
    return this.http.get<any>(`${this.url}/d/${districtCode}?depth=2`);
  }
}
