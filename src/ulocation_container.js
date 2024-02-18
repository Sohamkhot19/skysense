import React, { Component } from "react";
import "./ulocation.css";
export class ulocation_container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: ''
    };
  }

  startTime = () => {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    this.setState({ currentTime: `${h}:${m}:${s}` });
  };

  componentDidMount() {
    this.intervalId = setInterval(this.startTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    return (
      <>
        <div className="section">
          <div className="head">
            <p>SkySense | Good Evening</p>
          </div>
          <div className="container1">
            <h1 id="city">Mumbai</h1>
            <h4 id="country">India</h4>
            <div className="datetime-content">
              <div className="datetime">
                <p id="time">{this.state.currentTime}</p>
                <p id="date">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
              <p id="degree">32°c</p>
            </div>
          </div>
          <div className="container2">
          <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-cloud-sun" viewBox="0 0 16 16">
            <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.5 3.5 0 0 1 7 8m4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5z"/>
            <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708zm1.734 3.374a2 2 0 1 1 3.296 2.198q.3.423.516.898a3 3 0 1 0-4.84-3.225q.529.017 1.028.129m4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377M14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
          </svg>
            <h4 className="weather-type">Clear</h4>
            <div className="search-box">
            <form id="form" role="search">
            <input type="search" id="query" name="q"
             placeholder="Search..."
             aria-label="Search through site content"/>
            <svg xmlns="http://www.w3.org/2000/svg" id='search-icon' width="35px" height="35px" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
</svg>
          </form>
        </div>
          </div>
        </div>
      </>
    );
  }
}

export default ulocation_container;
