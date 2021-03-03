import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

//Importing Components
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsMain from './components/Articles/News/Main/index';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';

class Routes extends Component {
    render() {
        return (
            <Layout>       
                <Switch>
                    <Route path="/" exact component={Home} /> 
                    <Route path="/news" exact component={NewsMain} />
                    <Route path="/articles/:id" exact component={NewsArticle} />
                    <Route path="/videos/:id" exact component={VideoArticle} /> 
                </Switch>
            </Layout>

        )
    }
}

export default Routes;
