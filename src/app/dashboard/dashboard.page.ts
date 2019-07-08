import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ApiService } from "../services/api.service";
import { Component, OnInit } from "@angular/core";
import {
  NavController,
  PopoverController,
  MenuController
} from "@ionic/angular";
import { AuthenticateService } from "../services/authentication.service";
import { NotificationsComponent } from "../components/notifications/notifications.component";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Storage } from "@ionic/storage";
import { NotificationService } from "../services/notification/notification.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"]
})
export class DashboardPage implements OnInit {
  public weatherSearchForm: FormGroup;

  userEmail: string;
  enableNotifications: any;

  constructor(
    private authService: AuthenticateService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    public activeRouter: ActivatedRoute,
    private ionicStorage: Storage,
    private notificationService: NotificationService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  ngOnInit() {
    this.notificationService.scheduleANotification();
    if (this.authService.userDetails()) {
      this.userEmail = this.authService.userDetails().email;
      this.getWeather();
    } else {
      this.navCtrl.navigateBack("");
    }
  }

  logout() {
    this.authService
      .logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack("");
      })
      .catch(error => {
        console.log(error);
      });
  }

  async notifications(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      event: ev,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  public weatherForm = new FormGroup({
    city: new FormControl("", Validators.required)
  });
  public weather;
  public city;

  search(formData: FormData) {
    console.log(formData);
    this.ionicStorage.set("city", formData["city"]);

    this.apiService.getWeatherFromApi(formData["city"]).subscribe(weather => {
      this.weather = weather;
      console.log(weather);
    });
  }

  getWeather() {
    this.ionicStorage
      .get("city")
      .then(city => {
        if (city === null) {
          this.apiService.getWeatherFromApi("paris").subscribe(weather => {
            this.weather = weather;
            console.log(weather);
          });
        } else {
          this.apiService.getWeatherFromApi(city).subscribe(weather => {
            this.weather = weather;
            console.log(weather);
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
}
