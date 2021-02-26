import React from 'react';
import styles from '../articles.module.css'

const TeamInfo = (props) => {

    let pic = process.env.PUBLIC_URL;

    return (
        <div className={styles.articleTeamHeader}>
            <div className={styles.TeamHeaderleft}
                style={{
                    background:`url(${pic}/images/teams/${props.team.logo})`
                }}
            >
            </div>
            <div className={styles.TeamHeaderright}>
                <div>
                    <span>
                        {props.team.city}
                        {props.team.name}
                    </span>
                </div>
                <div>
                    <strong>
                        W{props.team.stats[0].wins}-L{props.team.stats[0].defeats}
                    </strong>
                </div>
            </div>
        </div>    
    );

};

export default TeamInfo;