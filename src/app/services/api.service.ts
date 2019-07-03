import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService  {

  constructor(private httpClient: HttpClient) {}

  getWeatherFromApi(city: string){
    return this.httpClient.get(`https://api.apixu.com/v1/current.json?key=333b7e9daba448289ca160800190307&q=${city}`);
  }

  // getWeatherFromApi(city: string){
  //   return this.httpClient.get(`https://api.apixu.com/v1/forecast.json?key=333b7e9daba448289ca160800190307&q=${city}`);
  // }

 

}