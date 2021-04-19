import React, { Component } from 'react'

import {firebase, firebaseDB, firebaseTeams, firebaseLooper} from '../../../../firebase';

//Importing style from the ARTICLES folder...
import styles from '../../articles.module.css';

//importting components...
import Header from './header';

class NewsArticles extends Component {
    
    state={
        article:[],
        team:[],
        imageURL: ''
    }

    componentWillMount(){
        //Referencing the id of clicked ARTICLE by the user......
        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot) => {
            let article = snapshot.val();

            //Fetching the data of the specific clicked article...
            firebaseTeams.orderByChild("id").equalTo(article.team).once('value')
            .then((snapshot) => {
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team,
                })
                this.getImageURL(article.image)
            })
        })

        // //Getting the id of that specific article/news on which user click...
        // //We are grabbing the id from the url of that specific article/news...
        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        // .then( response => {
        //     //Storing the data after running the upper AXIOS for getting data...
        //     let article = response.data[0];

        //     //Getting the data of team of specific article...
        //     axios.get(`${URL}/teams?id=${article.team}`)
        //     .then( response => {
        //         this.setState({
        //             //Setting the data of team from that specific article...
        //             article,
        //             team:response.data,
        //         })
        //     })
        // })

    }

    getImageURL = (filename) =>{
        firebase.storage().ref('images')
        .child(filename).getDownloadURL()
        .then( url => {
            this.setState({
                imageURL: url
            })
        })
    }

    render() {

        let pic = process.env.PUBLIC_URL;
        const article = this.state.article;
        const team = this.state.team;

        return (
            <div className={styles.articleWrapper}>
                <Header 
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />

                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style={{
                            // background:`url(${pic}/images/articles/${article.image})`
                            background:`url(${this.state.imageURL})`
                        }}
                    ></div>
                    <div className={styles.articleText}
                        dangerouslySetInnerHTML={{
                            __html: article.body
                        }}
                    >
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsArticles;

