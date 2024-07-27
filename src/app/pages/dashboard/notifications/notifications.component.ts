import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationsService } from '@core/services/dashboard/notifications.service';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { PaneNavigatorPanelComponent } from '@core/components/dashboard/pane-navigator-panel/pane-navigator-panel.component';
import { ModalService } from '@shared/services/modal.service';
import { UtilsService } from '@shared/services/utils.service';
import { ConfirmModalComponent } from '@core/components/dashboard/modals/confirm-modal/confirm-modal.component';
import { NotificationItemComponent } from '@core/components/dashboard/notification-item/notification-item.component';
import { notificationTrigger, routeFadeInOut } from '@shared/animations';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MyMatIconComponent,
    PaneNavigatorPanelComponent,
    NotificationItemComponent,
  ],
  templateUrl: './notifications.component.html',
  styles: `
  .empty-state {
    @apply mt-16 p-2 py-4 flex justify-center font-medium pb-12;
  }
`,
  animations: [notificationTrigger, routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class NotificationsComponent {
  allNotifications: NotificationType[] | undefined = undefined;
  error: string | null = null;
  activePane: NotificationsPaneType = 'unread';
  confirmDeleteAllNotificationsModalPropsData: ConfirmModalPropsType = {
    matIconName: 'delete',
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete all notifications?',
    ok: () => {
      this.ns.deleteAll().subscribe();
    },
  };

  get unreadNotifications(): NotificationType[] | undefined {
    return this.allNotifications?.filter((value) => !value.is_read);
  }

  get activeNotifications() {
    return this.activePane === 'unread'
      ? this.unreadNotifications
      : this.allNotifications;
  }

  get noNotificationText() {
    return this.activePane === 'unread'
      ? 'No Unread Notifications...'
      : 'No Notifications...';
  }

  get tabs() {
    return [
      {
        pane: 'unread',
        tabLabel: `Unread (${this.unreadNotificationSum})`,
      },
      {
        pane: 'all',
        tabLabel: `All (${this.allNotificationSum})`,
      },
    ];
  }

  private get allNotificationSum(): number {
    const allNotifications = this.allNotifications;
    return allNotifications ? allNotifications.length : 0;
  }

  private get unreadNotificationSum(): number {
    const unreadNotifications = this.unreadNotifications;
    return unreadNotifications ? unreadNotifications.length : 0;
  }

  constructor(
    public utils: UtilsService,
    public ns: NotificationsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.ns.notifications$.subscribe({
      next: (notifications) => {
        this.error = null;
        this.allNotifications = notifications;
      },
      error: (err) => {
        this.error = err;
        this.allNotifications = undefined;
      },
    });
  }

  markAsRead(notification: NotificationType) {
    this.ns.updateNotification(notification).subscribe();
  }

  deleteAll() {
    this.modalService.open(
      ConfirmModalComponent,
      this.confirmDeleteAllNotificationsModalPropsData
    );
  }
}
