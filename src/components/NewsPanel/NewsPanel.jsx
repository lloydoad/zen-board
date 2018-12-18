import React, { Component } from 'react';
import { Media } from 'react-bootstrap';

import './NewsPanel.css';

export default class NewsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [1, 2, 3],
        }
    }

    render() {

        return (
            <div 
            className={`lighter-pink-panel news-panel-container
            ${this.props.isExpanded? "newsVerticalExpand" : "newsVerticalCollapse"}`}>

            </div>
        );
    }
}