import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isOpenState$ = new BehaviorSubject<boolean>(false);
  private routerSubscription!: Subscription;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isOpenState$.next(false);
      }
    });
  }

  isOpen() {
    return this.isOpenState$.asObservable();
  }

  toggleState() {
    if (this.isOpenState$.value) {
      this.isOpenState$.next(false);
    } else {
      this.isOpenState$.next(true);
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
