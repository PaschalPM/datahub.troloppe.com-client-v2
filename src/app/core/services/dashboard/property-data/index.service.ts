import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private httpClient: HttpClient) { }

  createResource(resourceName: string, data: { state: string }) {
    const url = apiUrlFactory('/property-data/create-resource', { resource_name: resourceName });
    return this.httpClient.post<{ message: string, data: any }>(url, data)
  }
}
