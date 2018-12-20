import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import SmartMenu from './components/SmartMenu/SmartMenu';
import GeoPanel from './components/GeoPanel/GeoPanel';
import NewsDisplayPanel from './components/NewsPanel/NewsDisplayPanel';

import './App.css';

const API_KEY = "93864cfe75afb310af5519fc66a90d91";

class App extends Component {
  constructor() {
    super();
    this.state = {
      openPanels: {
        timePanel: false,
        newsPanel: false,
        readingListPanel: false,
        settingsPanel: false
      },
      timePanelInfo: {
        time: "1:44 PM",
        day: "December 16, 2018",
        width: "65%"
      },
      weatherPanelInfo: {
        temperature: "-",
        location: "-",
        width: "33%"
      },
      countryCode: undefined
    }
  }

  componentDidMount() {
    this.tick();
    this.timeID = setInterval(
      ()=>this.tick(), 
      60000
    );
    this.updateWeather();
    this.weatherID = setInterval(
      ()=>this.updateWeather(),
      3600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
    clearInterval(this.weatherID);
  }

  tick() {
    const { timePanelInfo } = this.state;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour12: true }
    let today  = new Date();
    timePanelInfo.day = today.toLocaleDateString("en-US", options);

    const timeFormatted = today.toLocaleTimeString("en-US", timeOptions).split(":");
    const meridian = timeFormatted[2].split(" ")[1];

    timePanelInfo.time = `${timeFormatted[0]}:${timeFormatted[1]} ${meridian}`;

    this.setState({timePanelInfo:timePanelInfo});
  }

  updateWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        const proxyForCors = `https://cors-anywhere.herokuapp.com/`;
        const fetchAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`;

        const startWeatherUpdate = async () => {
          const api_call = await fetch(`${proxyForCors}${fetchAPI}`);
          if(api_call.ok) {
            const { weatherPanelInfo } = this.state;
            const data = await api_call.json();

            const countryCode = `${data.sys.country}`;
            const strRep = `${data.main.temp}`
            const dateTokens = strRep.split(".");
            weatherPanelInfo.temperature = `${dateTokens[0]}°`;
            weatherPanelInfo.location = data.name;
            
            this.setState({
                weatherPanelInfo : weatherPanelInfo,
                countryCode: countryCode.toLowerCase()
            });
          }
        }; 

        startWeatherUpdate();
      });
    }
  }

  respondToMenuBtn = (panelName) => {
    const {openPanels} = this.state;

    if(panelName === "time") {
      openPanels.timePanel = !(openPanels.timePanel);
    }else if(panelName === "news") {
      openPanels.newsPanel = !(openPanels.newsPanel);
    }

    this.setState({openPanels:openPanels})
  }

  render() {
    const { timePanelInfo, weatherPanelInfo } = this.state;

    return (
      <Row className="app">
        <div className="left-section">
          <div className="left-container">
            <SmartMenu menuClicked={(input)=>this.respondToMenuBtn(input)}/>
            <div className="left-middle-container">
              <div 
              className={`left-middle-top-container 
              ${this.state.openPanels.timePanel? "verticalExpand" : "verticalCollapse"}`}>
                <GeoPanel 
                headline={timePanelInfo.time}
                underline={timePanelInfo.day}
                minWidth={timePanelInfo.width}
                />
                <GeoPanel 
                headline={weatherPanelInfo.temperature}
                underline={weatherPanelInfo.location}
                minWidth={weatherPanelInfo.width}
                />
              </div>
              <NewsDisplayPanel isExpanded={this.state.openPanels.newsPanel}/>
            </div>
          </div>
        </div>
      </Row>
    );
  }
}

export default App;
