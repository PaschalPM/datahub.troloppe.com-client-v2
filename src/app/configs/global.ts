import { HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

export const BASEURL = environment.baseURL;
export const BASE_API_URL = BASEURL + '/api';
export const apiUrlFactory = (path: string, params: Nullable<Record<string, string | undefined>> = null) => {
  let urlSearchParams = null
  if (params) {
    urlSearchParams = new URLSearchParams()

    for (let key in params) {
      let value = params[key]
      if (value) {
        urlSearchParams.set(key, value)
      }
    }
    return BASE_API_URL + path + '?' + urlSearchParams.toString()
  }

  return BASE_API_URL + path
}

export const apiHttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
};
