import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from '@configs/global';

@Injectable({
  providedIn: 'root',
})
export class StreetDataSearchService {
  constructor(private http: HttpClient) {}

  query(searchTerm: string) {
    return this.http.get<SearchedStreetDataApiType[]>(
      apiUrlFactory(`/street-data/search?q=${searchTerm}`)
    );
  }
}
