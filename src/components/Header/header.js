import React from 'react';
import { Link } from 'react-router-dom';
import style from './header.module.css';

import SideNav from './SideNav/sideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    //importing picture from PUBLIC_URL..... 
    let pic = process.env.PUBLIC_URL;

    const navBars = () =>(
        <div className={style.bars}>
            <FontAwesomeIcon 
                icon={faBars}
                onClick={props.onOpenNav}
                style={{
                    color: '#dfdfdf',
                    padding:'10px',
                    cursor:'pointer'
                }}    
            />
        </div>
    )

    const logo =()=>{
        return(
            <Link to="/" className={style.logo}>
                <img alt="nba logo" src={pic+"/images/nba_logo.png"} />
            </Link>
        )
    }

    return (
        <header className={style.header}>
            <SideNav {...props} />
            <div className={style.headerOpt}>
                {navBars()}
                {logo()}
            </div>
        </header>
    );
};

export default Header;