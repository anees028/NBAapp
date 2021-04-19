import React from 'react';

import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClock} from '@fortawesome/free-solid-svg-icons';
import styles from './cardInfo.module.css';

const CardInfo = (props) => {

    const teamName = (teams, team) =>{
        let data = teams.find( (item) =>{
            return item.teamId === team
        });
        if(data){
            return data.name;
        }

    }

    const formatedate = (date) =>{
        return moment(date).format(' DD-MM-YYYY')
    }

    return (
        <div className={styles.cardInfo}>
            <span className={styles.teamName} >
                {teamName( props.teams , props.team)}
            </span>
            <span className={styles.date} >
                <FontAwesomeIcon icon={faClock} />
                {formatedate(props.date)}
            </span>
        </div>
    );
};

export default CardInfo;