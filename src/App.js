import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import SmartMenu from './components/SmartMenu/SmartMenu';
import GeoPanel from './components/GeoPanel/GeoPanel';
import NewsDisplayPanel from './components/NewsPanel/NewsDisplayPanel';

import './App.css';

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
        temperature: "13°",
        location: "Orlando",
        width: "33%"
      }
    }
  }

  componentDidMount() {
    this.timeID = setInterval(
      ()=>this.tick(), 
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timeID);
  }

  tick() {
    const { timePanelInfo } = this.state;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var timeOptions = { hour12: true }
    var today  = new Date();
    timePanelInfo.day = today.toLocaleDateString("en-US", options);
    timePanelInfo.time = today.toLocaleTimeString("en-US", timeOptions);

    console.log("running");

    this.setState({timePanelInfo:timePanelInfo});
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
