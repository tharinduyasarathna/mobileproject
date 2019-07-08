import { Injectable } from "@angular/core";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private notifications: LocalNotifications) {}

  /**
   * This method can be used to schedule a notification
   */
  scheduleANotification = () => {
    this.notifications.schedule({
      text: "Delayed ILocalNotification",
      trigger: { at: new Date(new Date().getTime() + 60) },
      led: "FF0000",
      sound: null
    });
  };
}
