import React from 'react';
import { Link } from 'react-router-dom';
import styles  from './footer.module.css';

import {CURRENT_YEAR} from '../../config';

const Footer = (props) => {

    //importing picture from PUBLIC_URL..... 
    let pic = process.env.PUBLIC_URL;

    return (
        <div className={styles.footer}>
            <Link to="/" className={styles.logo}>
                <img alt="nba logo" src={pic+"/images/nba_logo.png"} />
            </Link>
            <div className={styles.right}>
                @NBA {CURRENT_YEAR} All right reserved.
            </div>
        </div>
    );
};

export default Footer;