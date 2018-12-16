import React, {Component} from 'react';
import './SmartMenu.css';

export default class SmartMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                { name: "Time and Place", logo: "xx" },
                { name: "News", logo: "xx"},
                { name: "Reading List", logo: "xx"},
                { name: "Settings", logo: "xx"}
            ]
        }
    }

    render() {
        return (
            <div className="menu-area">
                <div className="middle-pink-panel menu-bar left-menu-bar">
                
                </div>
            </div>
        );
    }
}