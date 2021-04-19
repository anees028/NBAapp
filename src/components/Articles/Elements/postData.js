import React from 'react';

import moment from 'moment';
import styles from '../articles.module.css';

const formateDate= (date) => {
    return moment(date).format(" DD-MM-YYYY");
}

const PostData = (props) => {
    return (
        <div className={styles.articlePostData}>
           <div> 
               Date : 
               <span> 
                   {formateDate(props.data.date)}
                </span>
           </div>
           <div>
               Author : 
               <span style={{marginLeft:'5px'}}>
                   {props.data.author}
               </span>
           </div>
        </div>
    );
};

export default PostData;