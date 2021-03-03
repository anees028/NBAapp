import React from 'react';
import VideosList from '../../../widgets/VideosList/videosList';

const VideosMain = () => {
    return (
        <div>
            <VideosList 
                type="card"
                loadmore={true}
                title={false}
                start={0}
                amount={8}
            />
        </div>
    );
};

export default VideosMain;