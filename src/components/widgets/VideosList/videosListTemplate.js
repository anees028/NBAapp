import React from 'react';
import {Link} from 'react-router-dom';
import CardInfo from '../CardInfo/cardInfo';

import styles from './videosList.module.css';

const VideosListTemplate = (props) => {
    //importing picture from PUBLIC_URL..... 
    let pic = process.env.PUBLIC_URL;

    console.log(props)
    return props.data.map( (item, i) => (
        <Link 
            to={`/videos/${item.id}`}
            key={i}
        >
            <div className={styles.videosListItem_wrapper}>
                <div className={styles.left}
                    style={{
                        background:`url(${pic}/images/videos/${item.image})`
                    }}
                >
                    <div style={{ background:`url(${pic}/images/play.png)` }} ></div>
                </div>

                <div className={styles.right}>
                    <CardInfo
                        teams={props.teams} 
                        team={item.team}
                        date={item.date}
                    />
                    <h2>{item.title}</h2>
                </div>
            </div>
        </Link>
    ))
};

export default VideosListTemplate;