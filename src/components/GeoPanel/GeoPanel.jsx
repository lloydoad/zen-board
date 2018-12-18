import React, { Component } from 'react';
import './GeoPanel.css';

export default class GeoPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headline: this.props.headline,
            underline: this.props.underline,
            minWidth: this.props.minWidth
        }
    }

    render() {
        const panelDimension = {
            width: this.state.minWidth,
            minWidth: this.state.minWidth,
            height: '150px'
        }

        return (
            <div className="middle-pink-panel smaller-panel" style={panelDimension}>
                <h1 className="smaller-panel-headline">{this.state.headline}</h1>
                <h4 className="smaller-panel-underline">{this.state.underline}</h4>
            </div>
        );
    }
}