import React, { Component } from 'react';
import { Media } from 'react-bootstrap';

import PlaceHolder from '../../images/placeholderNews.jpg';
import './NewsDisplayPanel.css';

export default class NewsDisplayPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            news: [
                {
                    headline: "ipsum lorem lorem", 
                    underline: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
                    previewImageSrc: "http://www.mcintyrereunion.com/wp-content/uploads/2018/01/newsarticle.jpg",
                    source: "Engadget",
                    date: "XX/XX/XX/XX"
                },
                {
                    headline: "ipsum lorem lorem", 
                    underline: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
                    previewImageSrc: undefined,
                    source: "Engadget",
                    date: "XX/XX/XX/XX"
                },
                {
                    headline: "ipsum lorem lorem", 
                    underline: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
                    previewImageSrc: "http://www.mcintyrereunion.com/wp-content/uploads/2018/01/newsarticle.jpg",
                    source: "Engadget",
                    date: "XX/XX/XX/XX"
                },
            ],
        }
    }

    respondToNewsClick = (index)=>this.setState({selectedIndex: index});

    respondToNewsClose = ()=>this.setState({selectedIndex: -1});

    render() {
        const { news } = this.state;
        const renderNews = news.map((newsObj, index) => {
            return (
                <div key={index} onClick={()=>this.respondToNewsClick(index)} className="news-collapser">
                    <Media>
                        <Media.Left>
                            {
                                newsObj.previewImageSrc != null ? 
                                <img width={64} height={64} src={newsObj.previewImageSrc} alt="thumbnail" /> : 
                                <img width={64} height={64} src={PlaceHolder} alt="thumbnail" />
                            }
                        </Media.Left>
                        <Media.Body>
                            <Media.Heading>{newsObj.headline}</Media.Heading>
                            <p>{`${(newsObj.underline).slice(0, 140)}...`}</p>
                        </Media.Body>
                    </Media>
                </div>
            );
        });

        let returnedRender;
        if(this.state.selectedIndex === -1) {
            returnedRender = renderNews;
        } else {
            const singleNewsObj = news[this.state.selectedIndex];

            returnedRender = (
                <div className="news-focused-container">
                    <div onClick={()=>this.respondToNewsClose()} className="news-focused-closed-button"></div>
                    <div style={{marginLeft:10, marginRight:10}}>
                        <h3 style={{marginTop:5}}>{singleNewsObj.headline}</h3>
                        <p>{singleNewsObj.source} {singleNewsObj.date}</p>
                        {
                            singleNewsObj.previewImageSrc != null ? 
                            <img className="news-focused-img" src={singleNewsObj.previewImageSrc} alt="thumbnail"></img> : 
                            <img className="news-focused-img" src={PlaceHolder} alt="thumbnail"></img>
                        }
                        <p style={{marginTop:10}}>{singleNewsObj.underline}</p>
                    </div>
                </div>
            );
        }

        return (
            <div 
            className={`lighter-pink-panel news-panel-container
            ${this.props.isExpanded? "newsVerticalExpand" : "newsVerticalCollapse"}`}>
                {returnedRender}
            </div>
        );
    }
}