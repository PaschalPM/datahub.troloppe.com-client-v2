import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private routerStore: Record<string, any> = {}

  constructor(private readonly router: Router) {

  }

  navigateByUrl(url: string | UrlTree, state: any = null) {
    if (state && typeof url === 'string') {
      this.routerStore[url] = state
    }
    return this.router.navigateByUrl(url)
  }

  getState(url: string) {
    const state = this.routerStore[url]
    delete this.routerStore[url]
    return state
  }

}
