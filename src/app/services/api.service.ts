import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService  {

 private API_KEY ='409f83f0f650fdec382657f83920fa8c';
 private API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';

  constructor( 
    
    private httpClient:HttpClient
    
    ) { }

   

//     

//https://medium.com/@hamedbaatour/build-a-real-world-beautiful-web-app-with-angular-6-a-to-z-ultimate-guide-2018-part-i-e121dd1d55e

getCityWeatherByName(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<string> {
  const dataSub = new Subject<string>();
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((data) => {
      dataSub.next(data['weather']);
    }, (err) => {
      console.log(err);;
    });
  return dataSub;
}

getCitiesWeathersByNames(cities: Array<string>, metric: 'metric' | 'imperial' = 'metric'): Subject<any> {
  const citiesSubject = new Subject();
  cities.forEach((city) => {
    citiesSubject.next(this.httpClient.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=API_KEY`));
  });
  return citiesSubject;
}

getWeatherState(city: string): Subject<string> {
  const dataSubject = new Subject<string>();
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=API_KEY`)
    .subscribe((data) => {
      dataSubject.next(data['weather'][0].main);
    });
  return dataSubject;
}

getCurrentTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  const dataSubject = new Subject<number>();
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((weather: any) => {
      dataSubject.next(Math.round(Number(weather.main.temp)));
    });
  return dataSubject;
}


getCurrentHum(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number> {
  const dataSubject = new Subject<number>();
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((weather: any) => {
      console.log(weather);
      dataSubject.next(weather.main.humidity);
    });
  return dataSubject;
}


getCurrentWind(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
  const dataSubject = new Subject<number>();
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((weather: any) => {
      dataSubject.next(Math.round(Math.round(weather.wind.speed)));
    });
  return dataSubject;
}


getMaxTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
  const dataSubject = new Subject<number>();
  let max: number;
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((weather: any) => {
      max = weather.list[0].main.temp;
      weather.list.forEach((value) => {
        if (max < value.main.temp) {
          max = value.main.temp;
        }
      });
      dataSubject.next(Math.round(max));
    });
  return dataSubject;
}

getMinTemp(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<number>  {
  const dataSubject = new Subject<number>();
  let min: number;
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((weather: any) => {
      min = weather.list[0].main.temp;
      weather.list.forEach((value) => {
        if (min > value.main.temp) {
          min = value.main.temp;
        }
      });
      dataSubject.next(Math.round(min));
    });
  return dataSubject;
}

getForecast(city: string, metric: 'metric' | 'imperial' = 'metric'): Subject<Array<any>>  {
  const dataSubject = new Subject<Array<any>>();
  this.httpClient.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${metric}&APPID=API_KEY`)
    .subscribe((weather: any) => {
      dataSubject.next(weather.list);
    });
  return dataSubject;
}

}