import React from 'react';
import {Switch} from 'react-router-dom';

//Importing Components
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewsMain from './components/Articles/News/Main/index';
import VideosMain from './components/Articles/Videos/Main/index';
import NewsArticle from './components/Articles/News/Post/index';
import VideoArticle from './components/Articles/Videos/Video/index';
import SignIn from './components/SignIn/signin';
import Dashboard from './components/Dashboard/dashboard';

import PublicRoute from './components/AuthRoutes/publicRoutes';
import PrivateRoute from './components/AuthRoutes/privateRoutes';

const Routes = (props) => {
    return (
        <Layout user={props.user}>       
            <Switch>
                <PublicRoute {...props} restricted={false} path="/" exact component={Home} /> 
                <PublicRoute {...props} restricted={false} path="/news" exact component={NewsMain} />
                <PublicRoute {...props} restricted={false} path="/videos" exact component={VideosMain} />
                <PublicRoute {...props} path="/signIn" restricted={true} exact component={SignIn} />
                <PublicRoute {...props} restricted={false} path="/articles/:id" exact component={NewsArticle} />
                <PublicRoute {...props} restricted={false} path="/videos/:id" exact component={VideoArticle} /> 
                <PrivateRoute {...props} path="/dashboard" exact component={Dashboard} />
                <PublicRoute {...props} restricted={false} path="/home" exact component={Home} /> 
            </Switch>
        </Layout>

    )
    
}

export default Routes;
