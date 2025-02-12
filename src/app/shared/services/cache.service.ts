import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private store: Record<string, { value: any; exp: number } | null> = {};
  private minutes = 0.5;

  configureDuration(durationInMinutes: number) {
    this.minutes = durationInMinutes;
  }

  get<T>(key: string): T | null {
    if (this.hasExpired(key)) {
      if (this.store[key]) {
        this.remove(key);
      }
      return null;
    }
    return this.store[key]?.value;
  }

  getStore() {
    return this.store
  }

  set<T>(key: string, value: T) {
    this.store[key] = {
      value,
      exp: this.getExpirationTime(),
    };
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }

  private hasExpired(key: string) {
    const currentDate = new Date();
    if (this.store[key])
      return currentDate.getTime() > this.store[key]!.exp;
    return true;
  }

  private getExpirationTime() {
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + this.minutes);
    return expirationDate.getTime();
  }
}
