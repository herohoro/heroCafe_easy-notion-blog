import styles from '../../styles/notion-block.module.css'

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

const Video=({url})=> {
    let matched
    try {
        matched = new URL(url).pathname.match(/\/[a-zA-Z0-9-_]{11}$/)
    } catch (error) {
        console.log(error)
        return null
    }

    if (!matched) {
        return null
    }
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

  return (
    <div className={styles.Video}>
        <YouTube videoId={matched[1]} opts={opts} onReady={onPlayerReady} />
    </div> 
  )
}

export default Video;