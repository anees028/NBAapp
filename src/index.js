import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import {firebase} from './firebase';

const App = (props) => {
  return (
    <BrowserRouter>
      <Routes {...props} />    
    </BrowserRouter>
  );
};

firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user}/>, document.getElementById('root'));
})


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
