import React, { Component } from 'react';

import {firebaseDB, firebaseTeams, firebaseLooper, firebaseVideos} from '../../../../firebase';

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
        //Referencing the id of clicked ARTICLE by the user......
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();

            //Fetching the data of the specific clicked article...
            firebaseTeams.orderByChild("id").equalTo(article.team).once('value')
            .then((snapshot) => {
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team,
                });
                this.getRelated();
            })
        })
    }

    //This function is use for fetching the related videos as the title of the live video.
    getRelated =() =>{
        //Fetching data of the related teams...
        firebaseTeams.once('value')
        .then((snapshot) => {
            const teams = firebaseLooper(snapshot);

            firebaseVideos.orderByChild("team").equalTo(this.state.article.team).limitToFirst(3).once('value')
            .then((snapshot) => {
                const related = firebaseLooper(snapshot);
                this.setState({
                    teams,
                    related
                })
            })

        })


        // axios.get(`${URL}/teams`)
        // .then(response => {
        //     let teams = response.data;
        //     axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //     .then( response => {
        //         this.setState ({
        //             teams,
        //             related : response.data,
        //         })
        //     })
        // })
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