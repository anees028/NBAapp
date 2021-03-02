import React, { Component } from 'react';
import axios from 'axios';
import {URL} from '../../../../config';

import Header from './header';

import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';

//importing styles
import styles from '../../articles.module.css';

class VideoArticle extends Component {

    state={
        article:[],
        team:[],
        teams:[],
        related:[]
    }

    componentWillMount(){
        //Getting the id of that specific videos on which user click...
        //We are grabbing the id from the url of that specific videos...
        axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        .then( response => {
            //Storing the data after running the upper AXIOS for getting data...
            let article = response.data[0];

            //Getting the data of team of specific article...
            axios.get(`${URL}/teams?id=${article.team}`)
            .then( response => {
                this.setState({
                    //Setting the data of team from that specific article...
                    article,
                    team:response.data,
                });
                //Calling the method of RELATED VIDEOS...
                this.getRelated();
            })

        })
    }

    //This function is use for fetching the related videos as the title of the live video.
    getRelated =() =>{
        axios.get(`${URL}/teams`)
        .then(response => {
            let teams = response.data;
            axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
            .then( response => {
                this.setState ({
                    teams,
                    related : response.data,
                })
            })
        })
    }

    render() {

        const article = this.state.article;
        const team = this.state.team;

        return (
            <div>
                <Header teamData={team[0]} />
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe 
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://www.youtube.com/embed/${article.url}`}                    
                    >
                    </iframe>
                    <VideosRelated 
                        data={this.state.related}
                        teams={this.state.teams}
                    />
                </div>
            </div>
        )
    }
}


export default VideoArticle;