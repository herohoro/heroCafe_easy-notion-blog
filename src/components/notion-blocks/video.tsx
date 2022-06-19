import styles from '../../styles/notion-block.module.css'
import React from 'react';
import YouTube, {YouTubeProps } from 'react-youtube';

const Video=({block})=> {
  const url = block.Video.External.Url
  const VIDEOS =url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  const videoID=""+VIDEOS[1]+"";
  //npm
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };
  console.log(VIDEOS)
  
  return (
    <div className={styles.Video}>
      <p>
        取得videoID______   {videoID}
      </p>
      <YouTube videoId={videoID} opts={opts} onReady={onPlayerReady} className={styles.youtube}/>
    </div>
  );
}

export default Video;