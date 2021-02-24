import React from 'react';
import { Link } from 'react-router-dom';
import Slick from 'react-slick';
import styles from './slider.module.css';

const SliderTemplates = (props) => {
    //importing picture from PUBLIC_URL..... 
    let pic = process.env.PUBLIC_URL;

    let template = null
    const settings={
        dots:true,
        arrows:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1,
    }

    switch(props.type){
        case("featured"):
            template = props.data.map((item , i) => {
                return(
                    <div key={i}>
                        <div className={styles.featured_item}>
                            <div className={styles.featured_image} 
                                style={{
                                    // background:`url(../images/articles/${item.image})` 
                                    background:`url(${pic}/images/articles/${item.image})` 
                                }}
                            >
                                <Link to={`/articles/${item.id}`} >
                                    <div className={styles.featured_caption}>
                                        {item.title}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })

            break;
        default:
            template = null;
    }

    return (
        <Slick {...settings} >
            {template}
        </Slick>
    );
};

export default SliderTemplates;