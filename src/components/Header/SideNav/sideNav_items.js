import React from 'react';
import { Link } from 'react-router-dom';
// import HomeIcon from "@material-ui/icons/Home";
// import Mailicon from "@me"
import FontAwesome from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faNewspaper, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import style from './sideNav.module.css';

const SideNavItems = () => {

    //const usingicon= [ {faHome, faNewspaper, faPlayCircle} ]

    const items = [
        {
            type:style.option,
            Icon:{faHome},
            text:'Home',
            link:'/',
        },
        {
            type:style.option,
            Icon:{faNewspaper},
            text:'News',
            link:'/news',
        },
        {
            type:style.option,
            Icon:{faPlayCircle},
            text:'Video',
            link:'/video',
        },
        {
            type:style.option,
            Icon:'sign-in',
            text:'Sign In',
            link:'/signIn',
        },
        {
            type:style.option,
            Icon:'sign-out',
            text:'Sign Out',
            link:'/signOut',
        }
    ]

    const showItems = () => {
        return items.map( (item, i ) =>{
            return(
                <div key={i} className={item.type}>
                    <Link to={item.link}>
                        
                        <FontAwesome name={item.Icon} style={{marginRight:"20px"}} 
                            //Icons are not Comming but Its need more research for importing and passign icons in array.
                         />
                        {item.text}
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