import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, i, data}) =>{ 
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    //dispatch jsut calls the reducer function with our action
    //which contains our type and our payload in this case just payload
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  return (
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80
    backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center
        bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? "flex bg-black bg-opacity-70" : "hidden" }`}>
          <PlayPause 
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.images?.coverart} />
      </div>
      <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white
            truncate">
              <Link to={`/songs/${song?.key}`}>
                {song.title}
              </Link>
            </p>
            <p className='text-sm truncate text-gray-300 mt-1'>
              <Link to={song.artists ? `/artists/${song?.artists[0]?.adamid}` : '/top-artists'}>
                {song.subtitle}
              </Link>
            </p>
        </div>
    </div>
);
}

export default SongCard;


/*
cool thing in tailwind on top of predefined classed you can 
you can modify values for attributes in css with [] around the value
of certain properties

bg-white/5 the /5 represents the opacity of the background colour basically
the alpha in RGBA

bg-opacity just changes the opacity of the elements background colour

backdrop-blur-sm adds the blur affect using the backdrop-filter css property

animate-slideup: really dope it creates an entire entry animation that moves
the components up on the y direction and using the animation property
to ease in the elements and a scroll animation using css animations.

rounded-lg: just sets a border radius for the song cards

cursor-pointer: common sense icl

h-56: sets height to 56px

relative, absolute key words for position

inset-0: sets all top, right, left, bottom to 0

group: just groups together the child divs under a div 
then group-pseudoclass selector will add an tailwind class to the entire 
group on the pseudo class selector so group-hover:flex adds the flex class
whenever any of the items in the 'group' are hovered over

note dont forget we can do a object?.anything like the property a callback
and it wont execute it if it doesnt exist or is undefined or null. 
We can also use it in the ternary operator

hidden: sets display to none

NOTE when we dont hover over it hides the div with hidden

truncate: jsut sets overflow to hidden, and text-overflow to elipses
and white space to nowrap basically collapses white
spaces into one and doesnt allow it to wrap to the next line

link tag takes us to a specific songs detail page.

we make a second link to the artist page and conditionally render it
after checking if the artist exists then we print the artist id checking
if the elements exist or just the top artists
*/