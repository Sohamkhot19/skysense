import React, { Component} from 'react'
import './forecast.css'
import axios from "axios";
import apiKeys from "./apikeys";

const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
export class Forecast_container extends Component {
 constructor(props){
  super(props);
  this.state={
    query: '',
    error: '',
    weather: {},
  };
  this.setQuery = this.setQuery.bind(this);
  this.setError = this.setError.bind(this);
  this.setWeather = this.setWeather.bind(this);
 }
 
 setQuery = (value) => {
  this.setState({ query: value });
};

setError = (message) => {
  this.setState({ error: message });
};

setWeather = (data) => {
  this.setState({ weather: data });
};


  search = (city) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${city != "[object Object]" ? city :this.state.query}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        this.setWeather(response.data);
        this.setQuery("");
      })
      .catch( (error) => {
        console.log(error);
        this.setWeather({});
        this.setQuery("");
        this.setError({ message: "Not Found", query: this.state.query });
      });
  };
  
  componentDidMount() {
    this.search('Delhi');
  }

  render() {
    const { weather, error } = this.state;
    return (
      
      <>
      
        <div className="container2">
        <p style={{textAlign:'center',margin:'2px'}}>Weather Highlights</p>
            <div className="search-box">
            <form id="form" role="search">
            <input type="text" id="query" name="q"
             placeholder="Search any city"
             aria-label="Search through site content"
             onChange={(e) => this.setQuery(e.target.value)}
             value={this.state.query}/>
            <i class="bi bi-search" onClick={this.search}></i>
          </form>
        </div>
        <div className="result-city" style={{display:'flex',justifyContent:'center',textAlign:'center',margin:'20px'}}>
        <p>{weather.name && weather.sys.country ? (
    <p>{weather.name} | {weather.sys.country}</p>
  ) : (
    <p>{error.query} {error.message}</p>
  )}</p>
        </div>
        
        <div className="weather-highlights">
          {weather && typeof weather.main !== 'undefined' ? (
            <div className='search-weather'>
              <div className="temp">
                <p>Temperature</p>
                <p className="temp-value">
                  {Math.round(weather.main.temp)}°c 
                </p>
                <p style={{fontSize:'22px'}}>{weather.weather[0].main}</p>
              </div>
              <div className="temp">
              <p>Wind Speed</p>
              <p className="temp-value">{Math.round(weather.wind.speed)}</p>
              <p>km/h</p>
            </div>
            <div className="temp">
              <p>Humidity</p>
              <p className="temp-value">{Math.round(weather.main.humidity)}%</p>
              <div
                className="progress"
                role="progressbar"
                aria-label="Example with label"
                aria-valuenow={Math.round(weather.main.humidity)}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ height: '5px', margin: '10px' }}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${Math.round(weather.main.humidity)}%` }}
                ></div>
              </div>
            </div>
            <div className="temp">
              <p>Visibility</p>
              <p className="temp-value">{Math.round(weather.visibility)}</p>
              <p>miles</p>
            </div>
              
            </div>
          ) : (
            <div className="temp">
              <p>{error.query}</p>
              <p>{error.message}</p>
            </div>
          )}
        </div>

          </div>
      </>
    )
  }
}

export default Forecast_container