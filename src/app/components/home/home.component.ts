import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private wetherApiKey = "ff1bc4683fc7325e9c57e586c20cc03e";

  WeatherData: any;
  userData: any;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.WeatherData = {
      main: {},
      isDay: true
    };

    this.route.queryParams.subscribe((res) => {
      let result = JSON.parse(res['data'])
      this.userData = result;
      let city = result['district']
      this.getWeatherData(city);
    })
  }



  public getWeatherData(city: string) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.wetherApiKey}`)
      .then(response => response.json())
      .then(data => { this.setWeatherData(data); })

    // let data = JSON.parse('{"coord":{"lon":72.85,"lat":19.01},"weather":[{"id":721,"main":"Haze","description":"haze","icon":"50n"}],"base":"stations","main":{"temp":297.15,"feels_like":297.4,"temp_min":297.15,"temp_max":297.15,"pressure":1013,"humidity":69},"visibility":3500,"wind":{"speed":3.6,"deg":300},"clouds":{"all":20},"dt":1580141589,"sys":{"type":1,"id":9052,"country":"IN","sunrise":1580089441,"sunset":1580129884},"timezone":19800,"id":1275339,"name":"Mumbai","cod":200}');
    // this.setWeatherData(data);
  }

  public setWeatherData(data: any) {
    if (data) {
      this.WeatherData = data;
      let sunsetTime = new Date(this.WeatherData.sys?.sunset * 1000);
      this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
      let currentDate = new Date();
      this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
      this.WeatherData.temp_celcius = (this.WeatherData.main?.temp - 273.15).toFixed(0);
      this.WeatherData.temp_min = (this.WeatherData.main?.temp_min - 273.15).toFixed(0);
      this.WeatherData.temp_max = (this.WeatherData.main?.temp_max - 273.15).toFixed(0);
      this.WeatherData.temp_feels_like = (this.WeatherData.main?.feels_like - 273.15).toFixed(0);
    }
  }

}