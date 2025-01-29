import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private httpClient: HttpClient) { }

  createState(data: { state: string }) {
    const url = apiUrlFactory('/property-data/create-state');
    return this.httpClient.post<{message: string, data: any}>(url, data)
  }
}
