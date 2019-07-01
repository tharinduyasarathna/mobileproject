import { FormBuilder , FormGroup} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, MenuController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { NotificationsComponent } from '../components/notifications/notifications.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
 
  public weatherSearchForm: FormGroup;
 
  userEmail: string;
  enableNotifications: any;

  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;


  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  sub5: Subscription;
 
 
  constructor(
    
    private authService: AuthenticateService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    private apiService:ApiService,
    private formBuilder: FormBuilder,
    public activeRouter: ActivatedRoute
    
   
    
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }
 
  ngOnInit(){
    
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
    }else{
      this.navCtrl.navigateBack('');
    }

    // this.weatherSearchForm = this.formBuilder.group({
    //   location: []
    // });

    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.sub1 = this.apiService.getWeatherState(this.city).subscribe((state) => this.state = state);
      this.sub2 = this.apiService.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
      this.sub3 = this.apiService.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.sub4 = this.apiService.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
      this.sub5 = this.apiService.getForecast(this.city).subscribe((data: any) => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);

          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);

          } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);

          } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);

          }
        }
      });

    });
  }
 
  logout(){
    this.authService.logoutUser()
    .then(res => {
      console.log(res);
      this.navCtrl.navigateBack('');
    })
    .catch(error => {
      console.log(error);
    })
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


//   sendToWether(formValues){
//     console.log(formValues);
//     this.apiService
//       .getWeather(formValues.location)
//       .subscribe(data => console.log(data));
// }
}