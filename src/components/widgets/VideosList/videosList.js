import React, { Component } from 'react';
import styles from './videosList.module.css';

import { firebaseTeams, firebaseVideos, firebaseLooper} from '../../../firebase';

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
            firebaseTeams.once('value')
            .then((snapshot) => {
                const teams = firebaseLooper(snapshot)
                this.setState({
                    teams
                })
            })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
        .then((snapshot) => {
            const videos = firebaseLooper(snapshot)
            this.setState({
                videos:[...this.state.videos, ...videos],
                start,
                end,
            })
        })
        .catch(e => {
            console.log(e)
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
        this.request(this.state.end + 1, end);
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
