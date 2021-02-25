import React from 'react';
import NewsList from '../widgets/NewsList/newsList';
import NewsSlider from '../widgets/NewsSlider/slider';
import VideosList from '../widgets/VideosList/videosList';

const Home = () => {
    return (
        <div>
            <NewsSlider 
                type="featured"
                start={0}
                amount={3}
                settings={{
                    dots:false
                }}
            />

            <NewsList 
                type="card"
                loadmore={true}
                start={3}
                amount={3}
            />

            <VideosList 
                type="card"
                loadmore={true}
                title={true}
                start={0}
                amount={3}
            />
        </div>
    );
};

export default Home;