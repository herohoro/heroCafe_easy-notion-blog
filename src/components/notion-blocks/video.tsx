import styles from '../../styles/notion-block.module.css'

import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import YouTube, { YouTubePlayer } from 'react-youtube';

// import './styles.css';

// const url = "https://www.youtube.com/watch?v=8nXqcugV2Y4";
// const VIDEOS = url.match(/[a-zA-Z0-9-_]{11}$/);


const Video=({block})=> {
  const url = block.Video.External.Url
  const VIDEOS = new URL(url).pathname.match(/[a-zA-Z0-9-_]{11}$/);
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [videoIndex, setVideoIndex] = useState(0);
  const [width, setWidth] = useState(600);
//   const [hidden, setHidden] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  console.log(VIDEOS)
  console.log(VIDEOS,{videoIndex})
  return (
    <div className={styles.Video}>
      <p>
        herohoro
      </p>
      
        <YouTube
          videoId={VIDEOS[videoIndex]}
          opts={{
            width,
            height: width * (9 / 16),
            playerVars: {
              autoplay: autoplay ? 1 : 0,
            },
          }}
          className="container"
          onReady={(event) => setPlayer(event.target)}
        />
    </div>
  );
}

// ReactDOM.render(<Video />, document.getElementById('app'));


export default Video;