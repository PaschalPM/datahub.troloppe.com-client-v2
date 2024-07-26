import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MediaQueryService } from './media-query.service';
import { LARGE_SCREEN_SIZE } from './constants/media-query';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private isOpenState$ = new BehaviorSubject<boolean>(false);
  private isLargeScreen!: boolean;
  private routerSubscription!: Subscription;
  private mediaQuerySubscription!: Subscription;

  constructor(private router: Router, private mediaQuery: MediaQueryService) {
    this.mediaQuery.observe(LARGE_SCREEN_SIZE).subscribe((value) => {
      this.isLargeScreen = value;
      if (location.pathname.startsWith('/dashboard')) {
        if (this.isLargeScreen) {
          this.isOpenState$.next(true);
        } else {
          this.isOpenState$.next(false);
        }
      }
    });
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && !this.isLargeScreen) {
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
    this.mediaQuerySubscription.unsubscribe();
  }
}
