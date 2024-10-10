import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiHttpOptions, apiUrlFactory } from '@configs/global';

@Injectable({
  providedIn: 'root',
})
export class SectorsService {
  constructor(private http: HttpClient) {}

  store(body: { name: string }) {
    return this.http.post<{ id: number }>(
      apiUrlFactory('/sectors'),
      body,
      apiHttpOptions
    );
  }
}
