import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiUrlFactory } from 'app/configs/global';
import { LoaderService } from '@shared/services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsObservable = new BehaviorSubject<
    NotificationType[] | undefined
  >(undefined);

  constructor(private httpClient: HttpClient, private loader: LoaderService) {}

  get notifications$() {
    return this.notificationsObservable.asObservable();
  }

  get unreadNotifications$() {
    return this.notificationsObservable
      .asObservable()
      .pipe(
        map((notifications) =>
          notifications
            ? this.getUnreadNotifications(notifications as NotificationType[])
            : undefined
        )
      );
  }

  get unreadCount$() {
    return this.notificationsObservable
      .asObservable()
      .pipe(
        map((notifications) => notifications ? 
          this.getUnreadCount(notifications as NotificationType[]) : 0
        )
      );
  }

  get count$() {
    return this.notificationsObservable
      .asObservable()
      .pipe(map((notifications) => notifications ? notifications?.length : 0));
  }

  getNotifications() {
    return this.httpClient
      .get<NotificationType[]>(apiUrlFactory('/notifications/all'))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            return of([]);
          }
          return throwError(() => err);
        }),
        tap({
          next: (value) => {
            this.notificationsObservable.next(value);
          },
        })
      );
  }

  updateNotification(notification: NotificationType) {
    this.loader.start();
    return this.httpClient
      .put<NotificationType>(apiUrlFactory('/notifications/mark-as-read'), {
        id: notification.id,
      })
      .pipe(
        tap({
          next: (value) => {
            const updatedNotifications =
              this.notificationsObservable.value?.map((notification) =>
                notification.id === value.id
                  ? { ...notification, is_read: true }
                  : notification
              );
            this.notificationsObservable.next(updatedNotifications);
            this.loader.stop();
          },
          error: () => {
            this.loader.stop();
          },
        })
      );
  }

  deleteAll() {
    this.loader.start();
    return this.httpClient
      .delete(apiUrlFactory('/notifications/delete-all'))
      .pipe(
        tap({
          next: () => {
            this.notificationsObservable.next([]);
            this.loader.stop();
          },
          error: () => {
            this.loader.stop();
          },
        })
      );
  }

  private getUnreadNotifications(notifications: NotificationType[]) {
    return notifications?.filter((value) => !value.is_read);
  }

  private getUnreadCount(notifications: NotificationType[]) {
    return this.getUnreadNotifications(notifications).length;
  }
}
