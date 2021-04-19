import React from 'react';
//Using WITHROUTER will inject the route information inside this component.
import { Link, withRouter } from 'react-router-dom';
import { firebase } from '../../../firebase';

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

const SideNavItems = (props) => {
    console.log(props)
    //const usingicon= [ {faHome, faNewspaper, faPlayCircle} ]

    const items = [
        {
            type:style.option,
            icon: <HomeIcon/>,
            text:'Home',
            link:'/home',
            login:''
        },
        {
            type:style.option,
            icon:<AnnouncementIcon />,
            text:'News',
            link:'/news',
            login:''
        },
        {
            type:style.option,
            icon:<PlayArrowIcon />,
            text:'Videos',
            link:'/videos',
            login:''
        },
        {
            type:style.option,
            icon:<ArrowForwardIcon />,
            text:'Dashboard',
            link:'/dashboard',
            login:false,
        },
        {
            type:style.option,
            icon:<ArrowForwardIcon />,
            text:'Sign In',
            link:'/signIn',
            login:true,
        },
        {
            type:style.option,
            icon:<ExitToAppIcon />,
            text:'Sign Out',
            link:'/signOut',
            login:false,
        }
    ]

    const element = (item ,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <span style={{margin:0, textAlign:'center'}}>
                    <div>{item.icon}</div>
                    <div>{item.text}</div>
                </span>
            </Link>
        </div>
    )

    const restricted =(item, i)=> {
        let template= null;
        //Its for User Login condition ...
        if(props.user === null && item.login){
            template = element(item, i);
        }
        //Its for user NOT login condition...
        if( props.user !== null && !item.login){
            if(item.link === '/signOut'){
                template = (
                    <div key={i} 
                        className={item.type}
                        onClick={() => {
                            firebase.auth().signOut()
                            .then(() => {
                                props.history.push("/")
                            })
                        }}
                        >
                        <span style={{margin:0, textAlign:'center'}}>
                            <div>{item.icon}</div>
                            <div>{item.text}</div>
                        </span>
                    </div>
                )
            }
            else{
                template = element(item, i);
            }
        }

        return template;
    }

    const showItems = () => {
        return items.map( (item, i ) =>{
            return item.login !== '' ? 
                restricted(item, i)
            : 
                element(item,i)
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

export default withRouter(SideNavItems);