import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_API_URL } from '@configs/global';
import { CookieService } from 'ngx-cookie-service';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {

  constructor(private readonly httpClient: HttpClient, private readonly cookieService: CookieService) { }

  private getCsrfToken() {
    return this.cookieService.get('XSRF-TOKEN');
  }

  csrfRequest() {
    const token = this.getCsrfToken()

    return token ? of(token) : this.httpClient.get(BASE_API_URL + '/sanctum/csrf-cookie', { withCredentials: true }).pipe(map(_ => {
      return this.getCsrfToken()
    }));
  }

}
