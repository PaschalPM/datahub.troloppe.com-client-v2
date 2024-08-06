import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

export const BASEURL = environment.baseURL;
export const BASE_API_URL = BASEURL+'/api';
export const apiUrlFactory = (path: string) => {
  return BASE_API_URL+path
}

export const apiHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};
