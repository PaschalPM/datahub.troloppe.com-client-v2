import { Component, Input } from '@angular/core';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { Subscription } from 'rxjs';
import { NotificationsService } from '@core/services/dashboard/notifications.service';
import { fadeInOut } from '@shared/animations';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';

@Component({
  selector: 'dashboard-notification-pane',
  standalone: true,
  imports: [NotificationItemComponent, SpinnerComponent],
  templateUrl: './notification-pane.component.html',
  animations: [fadeInOut],
  styles: `
  :host{
    display: contents
  }
  .empty-state {
    @apply mt-16 p-2 py-4 flex justify-center font-medium pb-12;
  }
`
})
export class NotificationPaneComponent {
  @Input({ required: true }) notifications: NotificationType[] | undefined
  @Input({ required: true }) notificationType!: 'unread' | 'all'
  @Input({ required: true }) error: any


  get noNotificationText() {
    return this.notificationType === 'unread'
      ? 'No Unread Notifications...'
      : 'No Notifications...';
  }



  constructor(private ns: NotificationsService) { }

  markAsRead(notification: NotificationType) {
    this.ns.updateNotification(notification).subscribe();
  }

}
