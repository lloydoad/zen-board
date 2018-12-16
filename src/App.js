import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import SmartMenu from './components/SmartMenu/SmartMenu';

import './App.css';

class App extends Component {
  render() {
    return (
      <Row className="app">
        <div className="left-section">
          <div className="left-container">
            <SmartMenu />
          </div>
        </div>
      </Row>
    );
  }
}

export default App;
