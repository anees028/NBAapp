import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAsWqE_r99dDKDM-alVekGOKF07EgqbDYY",
    authDomain: "nbafull-25bdb.firebaseapp.com",
    databaseURL: "https://nbafull-25bdb-default-rtdb.firebaseio.com",
    projectId: "nbafull-25bdb",
    storageBucket: "nbafull-25bdb.appspot.com",
    messagingSenderId: "850471628945",
    appId: "1:850471628945:web:db450ccd69b8dbb4080f30"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot) => {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key,
        })
    });
    return data;
} 

export{
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseVideos,
    firebaseTeams,
    firebaseLooper,
}


