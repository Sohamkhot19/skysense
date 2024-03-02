import React, { Component } from "react";
import "./ulocation.css";
import Forecast_container from "./forecast_container";
import apiKeys from "./apikeys";
import loader from "./WeatherIcons.gif";
import ReactAnimatedWeather from "react-animated-weather";
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
export class ulocation_container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: "",
      greeting: "",
      photo: null,
      color: null,
      lat: undefined,
      lon: undefined,
      errorMessage: undefined,
      temperatureC: undefined,
      temperatureF: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      icon: "CLEAR_DAY",
      sunrise: undefined,
      sunset: undefined,
      errorMsg: undefined,
    };
  }
  determineGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting = "";
    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 22) {
      greeting = "Good Evening";
    } else {
      greeting = "Good Night";
    }

    this.setState({ greeting });
  };
  determinephoto = () => {
    const currentHour = new Date().getHours();
    let photo = null;
    if (currentHour >= 5 && currentHour < 9) {
      import("./early-morning.jpg").then((image) => {
        this.setState({ photo: image.default, color: "white" });
      });
    }
    if (currentHour >= 9 && currentHour < 12) {
      import("./late-morning.jpg").then((image) => {
        this.setState({ photo: image.default, color: "black" });
      });
    }
    if (currentHour >= 12 && currentHour < 15) {
      import("./afternoon.jpg").then((image) => {
        this.setState({ photo: image.default, color: "black" });
      });
    }
    if (currentHour >= 15 && currentHour < 17) {
      import("./late-afternoon.jpg").then((image) => {
        this.setState({ photo: image.default, color: "black" });
      });
    }
    if (currentHour >= 17 && currentHour < 19) {
      import("./evening.jpg").then((image) => {
        this.setState({ photo: image.default, color: "white" });
      });
    }
    if (currentHour >= 19 && currentHour < 20) {
      import("./late-evening.jpg").then((image) => {
        this.setState({ photo: image.default, color: "white" });
      });
    }
    if (currentHour >= 20 && currentHour < 0) {
      import("./early-night.jpg").then((image) => {
        this.setState({ photo: image.default, color: "white" });
      });
    }
    if (currentHour >= 0 && currentHour < 5) {
      import("./night.jpg").then((image) => {
        this.setState({ photo: image.default, color: "white" });
      });
    }
    this.setState({ photo });
  };
  startTime = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    this.setState({ currentTime: `${h}:${m}:${s}` });
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          this.getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
    this.intervalId = setInterval(() => {
      this.startTime();
      this.determineGreeting(); // Call determineGreeting here
      this.determinephoto();
      this.getWeather(this.state.lat, this.state.lon);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  getWeather = async (lat, lon) => {
    try {
      const api_call = await fetch(
        `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
      );

      const data = await api_call.json();

      // Check if the required properties are available in the response
      if (data && data.main && data.main.temp) {
        this.setState({
          lat: lat,
          lon: lon,
          city: data.name,
          temperatureC: Math.round(data.main.temp),
          temperatureF: Math.round(data.main.temp * 1.8 + 32),
          humidity: data.main.humidity,
          main: data.weather[0].main,
          country: data.sys.country,
        });

        // Switch statement and icon setting remains the same
        switch (this.state.main) {
          case "Haze":
            this.setState({ icon: "CLEAR_DAY" });
            break;
          case "Clouds":
            this.setState({ icon: "CLOUDY" });
            break;
          case "Rain":
            this.setState({ icon: "RAIN" });
            break;
          case "Snow":
            this.setState({ icon: "SNOW" });
            break;
          case "Dust":
            this.setState({ icon: "WIND" });
            break;
          case "Drizzle":
            this.setState({ icon: "SLEET" });
            break;
          case "Fog":
            this.setState({ icon: "FOG" });
            break;
          case "Smoke":
            this.setState({ icon: "FOG" });
            break;
          case "Tornado":
            this.setState({ icon: "WIND" });
            break;
          default:
            this.setState({ icon: "CLEAR_DAY" });
        }
      } else {
        console.error("Invalid data structure in the API response");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <>
          <React.Fragment>
            <div className="section">
              <div className="head">
                <p>SkySense | {this.state.greeting}</p>
              </div>
              <div
                className="container1"
                style={{
                  backgroundImage: `url(${this.state.photo})`,
                  color: `${this.state.color}`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h1 id="city" style={{ color: `${this.state.color}` }}>
                  {this.state.city}
                </h1>
                <h4 id="country" style={{ color: `${this.state.color}` }}>
                  {this.state.country}
                </h4>

                <div className="weather-info">
                  <ReactAnimatedWeather
                    icon={this.state.icon}
                    color={this.state.color}
                    size={defaults.size}
                    animate={defaults.animate}
                  />
                  <h4 className="weather-type">{this.state.main}</h4>
                  <p id="degree">{this.state.temperatureC}°c</p>
                </div>

                <div className="datetime-content">
                  <div className="datetime">
                    <p id="time" style={{ color: `${this.state.color}` }}>
                      {this.state.currentTime}
                    </p>
                    <p id="date" style={{ color: `${this.state.color}` }}>
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <Forecast_container />
            </div>
          </React.Fragment>
        </>
      );
    } else {
      return (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
        </React.Fragment>
      );
    }
  }
}

export default ulocation_container;
