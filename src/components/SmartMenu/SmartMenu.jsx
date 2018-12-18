import React, {Component} from 'react';

import GeoLogo from '../../images/time.png';
import NewsLogo from '../../images/world.png';
import ReadingLogo from '../../images/reading.png';
import SettingsLogo from '../../images/settings.png';
import './SmartMenu.css';

export default class SmartMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                { name: "Time and Place", logo: GeoLogo, isFocused: false, response: "time" },
                { name: "News", logo: NewsLogo, isFocused: false, response: "news" },
                { name: "Reading List", logo: ReadingLogo, isFocused: false, response: "list" },
                { name: "Settings", logo: SettingsLogo, isFocused: false, response: "settings" }
            ]
        }
    }

    menuHover = (index) => {
        let {menuItems} = this.state;
        menuItems[index].isFocused = true;
        this.setState({menuItems: menuItems});
    }

    menuHoverExit = (index) => {
        let {menuItems} = this.state;
        menuItems[index].isFocused = false;
        this.setState({menuItems: menuItems});
    }

    render() {
        const { menuItems } = this.state;
        const menuButton = menuItems.map((menuItem, index) => {
            let innerBtn;

            if(menuItem.isFocused === false) {
                innerBtn = 
                    <img
                    src={menuItem.logo} 
                    alt={menuItem.name}
                    className="menu-button"
                    />;
            } else {
                innerBtn = 
                    <p className="menu-button menu-label">
                        {menuItem.name}
                    </p>;
            }

            return (
                <div 
                key={menuItem.name} 
                onMouseEnter={()=>{this.menuHover(index)}}
                onMouseLeave={()=>{this.menuHoverExit(index)}} 
                onClick={()=>this.props.menuClicked(menuItem.response)}
                className="button-container">
                    {innerBtn}
                </div>
            );
        });

        return (
            <div className="menu-area">
                <div className="middle-pink-panel menu-bar left-menu-bar">
                    {menuButton}
                </div>
            </div>
        );
    }
}