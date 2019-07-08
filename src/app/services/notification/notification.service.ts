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
      id: 1,
      text: "Single ILocalNotification",
      sound: isAndroid ? "file://sound.mp3" : "file://beep.caf",
      data: { secret: key }
    });
  };
}
