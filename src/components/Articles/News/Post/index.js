import React, { Component } from 'react'
import axios from 'axios';
import {URL} from '../../../../config';

//Importing style from the ARTICLES folder...
import styles from '../../articles.module.css';

//importting components...
import Header from './header';
import Body from './body';


class NewsArticles extends Component {

    state={
        article:[],
        team:[],
    }

    componentWillMount(){
        //Getting the id of that specific article/news on which user click...
        //We are grabbing the id from the url of that specific article/news...
        axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
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
                })
            })

        })

    }


    render() {

        const article = this.state.article;
        const team = this.state.team;

        return (
            <div className={styles.articleWrapper}>
                <Header 
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                />
                <Body  />
            </div>
        )
    }
}

export default NewsArticles;

