import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
window.onload = function(){
    //ReactDOM.render(<button onClick= {addWeather}>Choose A City</button>,document.getElementById('root'));
    addWeather();

};



function addWeather() {
    let location = prompt("Enter City Name");
    //let location = 'toronto';
    var key = '69c2608a9fe3b44f7b5c4868bb69c8eb';
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + key + "&units=metric")  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
      createWeatherElements(data);
    })
    
    .catch(function() {
    });
  }
  function createWeatherElements(data){
    
    ReactDOM.render(<WeatherNode data ={data}/>,document.getElementById('root'));

}



class WeatherNode extends React.Component {
    constructor(props) {
        super(props);
      }
    
    render() {
        console.log("icon id is" + this.props.data.weather[0].icon);
        let imgsrc = "http://openweathermap.org/img/wn/" + this.props.data.weather[0].icon + "@2x.png";
        return(
        <div className = "WN">
            <div className = "location">{this.props.data.name}</div>
            <div className = "temperature">
                <img className ="border" src = {imgsrc}></img>
                <div className ="number">{this.props.data.main.temp}°C</div>
                </div>
            <div className = "clouds">Clouds: {this.props.data.clouds.all}%</div>
            <div className = "humidity"> Humidity: {this.props.data.main.humidity}</div>
            <div className = "wind"> Wind: {this.props.data.wind.speed}m/s</div>
            <div className = "pressure"> Pressure: {this.props.data.main.pressure}hpa</div>
            <button onClick={addWeather}> Change City</button>
        </div>
        );
    }
  }
