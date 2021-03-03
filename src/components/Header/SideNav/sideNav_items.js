import React from 'react';
import { Link } from 'react-router-dom';

// import FontAwesome from 'react-fontawesome';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHome, faLogIn } from '@fortawesome/free-solid-svg-icons'

//Importing Icons in the Side Nav Bar...
import HomeIcon from '@material-ui/icons/Home';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import style from './sideNav.module.css';

const SideNavItems = () => {

    //const usingicon= [ {faHome, faNewspaper, faPlayCircle} ]

    const items = [
        {
            type:style.option,
            icon: <HomeIcon/>,
            text:'Home',
            link:'/',
        },
        {
            type:style.option,
            icon:<AnnouncementIcon />,
            text:'News',
            link:'/news',
        },
        {
            type:style.option,
            icon:<PlayArrowIcon />,
            text:'Videos',
            link:'/videos',
        },
        {
            type:style.option,
            icon:<ArrowForwardIcon />,
            text:'Sign In',
            link:'/signIn',
        },
        {
            type:style.option,
            icon:<ExitToAppIcon />,
            text:'Sign Out',
            link:'/signOut',
        }
    ]

    const showItems = () => {
        return items.map( (item, i ) =>{
            return(
                <div key={i} className={item.type}>
                    <Link to={item.link}>
                        {/* {item.icon}
                        {item.text} */}
                        <span style={{margin:0, textAlign:'center'}}>
                            <div>{item.icon}</div>
                            <div>{item.text}</div>
                        </span>
                    </Link>
                </div>
            )
        })
    }

    return (
        <div>
            {
                //Calling the function we have created and mapping all the items of array in the form of Side Nav List...
                showItems() 
            } 
        </div>
    );
};

export default SideNavItems;