import styles from '../../styles/notion-block.module.css'

import React from 'react';
import YouTube, {YouTubeProps } from 'react-youtube';

// import './styles.css';

// const url = "https://www.youtube.com/watch?v=8nXqcugV2Y4";
// const VIDEOS = url.match(/[a-zA-Z0-9-_]{11}$/);


const Video=({block})=> {
  const url = block.Video.External.Url
  const VIDEOS = new URL(url).pathname.match(/[a-zA-Z0-9-_]{11}$/).toString();
  
  //npm
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  console.log(VIDEOS)
  
  return (
    <div className={styles.Video}>
      {/* <p>
        取得videoID:{VIDEOS}
      </p> */}
      <YouTube videoId={VIDEOS} opts={opts} onReady={onPlayerReady} className={styles.youtube}/>
        
    </div>
  );
}


export default Video;