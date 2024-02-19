import React, { Component } from 'react'
import './forecast.css'
export class Forecast_container extends Component {
  render() {
    return (
      <>
        <div className="container2">
        <p style={{textAlign:'center',margin:'2px'}}>Weather Highlights</p>
            <div className="search-box">
            <form id="form" role="search">
            <input type="search" id="query" name="q"
             placeholder="Search any city"
             aria-label="Search through site content"/>
            <svg xmlns="http://www.w3.org/2000/svg" id='search-icon' width="35px" height="35px" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </form>
        </div>
        <div className="result-city" style={{display:'flex',justifyContent:'center',textAlign:'center',margin:'20px'}}>
        <p>london | UK </p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clouds-fill" viewBox="0 0 16 16">
        <path d="M11.473 9a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 14h8.5a2.5 2.5 0 1 0-.027-5"/>
        <path d="M14.544 9.772a3.5 3.5 0 0 0-2.225-1.676 5.5 5.5 0 0 0-6.337-4.002 4.002 4.002 0 0 1 7.392.91 2.5 2.5 0 0 1 1.17 4.769z"/>
        </svg>
        </div>
        
        <div className="weather-highlights">
            
            <div className="temp">
                <p>Temperature</p>
                <p className='temp-value'>32°c</p>
                <p>cloudy</p>
            </div>
            <div className="temp">
                <p>Wind Speed</p>
                <p className='temp-value'>4.3</p>
                <p>km/h</p>
            </div>
            <div className="temp">
                <p>Humidity</p>
                <p className='temp-value'>50%</p>
                <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{height:'5px',margin:'10px'}}>
                    <div className="progress-bar" style={{width:'50%'}}></div>
                </div>
            </div>
            <div className="temp">
                <p>Visibility</p>
                <p className='temp-value'>1</p>
                <p>miles</p>
            </div>
        </div>

          </div>
      </>
    )
  }
}

export default Forecast_container