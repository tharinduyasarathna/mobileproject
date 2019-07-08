import { ApiService } from "../app/services/api.service";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "src/environments/environment";
import { AuthenticateService } from "./services/authentication.service";
import { AngularFireAuthModule } from "@angular/fire/auth";

import * as firebase from "firebase";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { NotificationService } from "./services/notification/notification.service";
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  entryComponents: [NotificationsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),

    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticateService,
    ApiService,
    NotificationService,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
