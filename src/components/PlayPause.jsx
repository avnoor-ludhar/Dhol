import { FaPauseCircle, FaPlayCircle} from 'react-icons/fa';
import React from 'react';


//note this is a complex conditional rendering if the music is playing and the active
//song exists and is equal to the current song we display a pause button
//if it is false we have a play button.

//icons from react-icons

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay}) => (
  isPlaying && activeSong?.title === song.title ? (
    <FaPauseCircle 
      size={35}
      className={"text-gray-300"}
      onClick={handlePause}
    />
  ) : (
    <FaPlayCircle 
      size={35}
      className={"text-gray-300"}
      onClick={handlePlay}
    />
  ));

export default PlayPause;
