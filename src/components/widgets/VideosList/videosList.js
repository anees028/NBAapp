import React, { Component } from 'react';
import styles from './videosList.module.css';

import axios from 'axios';
import {URL} from '../../../config';
import Button from '../Buttons/buttons';

import VideosListTemplate from './videosListTemplate';


class VideosList extends Component {

    //setting default state...
    state = {
        teams:[],
        videos:[],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount,
    }

    //Rendreing the title named : NBA Videos ....
    renderTitle = () => {
        return this.props.title ? 
            <h3 className={styles.videoTitle}><strong>NBA</strong> Videos</h3>
        : null
    }
    //We are calling the request during the rendering of the page...
    componentWillMount(){
        this.request(this.state.start, this.state.end)
    }

    //Requesting data from dbjson of TEAMS and storing in teams array in state...
    request = (start, end) =>{
        if(this.state.teams.length < 1) {
            axios.get(`${URL}/teams`).then( response => {
                this.setState({
                    teams:response.data
                })
            })
        }

        axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        .then( response =>{
            this.setState({
                //Storing default state and then updating default state with new state...
                videos:[ ...this.state.videos, ...response.data ],
                start,
                end
            })
        })
    }

    renderVideos= () =>{
        let template =null;
        switch(this.props.type){
            case("card"):
            {
                //We are calling the Videos Component template for rendering the videos list template...
                template = <VideosListTemplate  data={this.state.videos} teams={this.state.teams} />
            }
            break;

            default:
                template=null;
        }

        return template;
    }

    //This function is showing the loading of more news on pressing the LOAD MORE VIDEOS....
    loadMore =() => {
        let end= this.state.end + this.state.amount;
        this.request(this.state.end, end);
    }

    renderButton = () => {
        return this.props.loadmore ? 
        <Button
            type="loadmore"
            loadMore={()=> this.loadMore()}
            text="Load More Videos"
        /> 
        : 
        <Button 
            type="linkTo"
            text="More Videos"
            linkTo="/videos"
        />
    }

    render() {
        return (
            <div>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}


export default VideosList
