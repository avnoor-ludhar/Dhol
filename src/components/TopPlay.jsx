import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import {useSelector, useDispatch } from 'react-redux';
//package to create a scroll animation on the artists
import { Swiper, SwiperSlide} from 'swiper/react';
import { FreeMode } from 'swiper';

//swiper also makes us import some css
import 'swiper/css';
import 'swiper/css/free-mode';

import PlayPause from './PlayPause.jsx';
import { playPause, setActiveSong } from "../redux/features/playerSlice.js";
import { useGetTopChartsQuery } from "../redux/services/shazamCore.js";

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e]
  py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">
      {i + 1}.
    </h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img className='w-20 h-20 rounded-lg' src={song?.images?.coverart} alt = {song?.title}/>
      <div className='flex-1 flex flex-col justify-center mx-3'>
        <Link to={`/songs/${song.key}`}>
          <p className='text-xl font-bold text-white'>
            {song?.title}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className='text-base text-gray-300 mt-1'>
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </div>
  );

const TopPlay = () => {
  const dispatch = useDispatch();
  //useSelector is used to get values from a redux state with a callback 
  //function taht contains the state
  const { activeSong, isPlaying } = useSelector( (state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  //on Load calls the scrollIntoView method on the 
  //div. which will smoothly scroll the div into the view of the user
  //will take out the array so that it happens everytime we 
  //render the page

  useEffect(()=>{
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  });

  //data is just the 50 most popular world songs
  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    //dispatch jsut calls the reducer function with our action
    //which contains our type and our payload in this case just payload
    dispatch(setActiveSong({song, data, i}));
    dispatch(playPause(true));
  };

  //divRef is to fix the is
  return (
  <div ref={divRef} className='xl:ml-6 ml-0 xl:mb-0 mb-6 
  flex-1 xl:max-w-[500px] max-w-full flex flex-col'>
    <div className='w-full flex flex-col'>
      <div className='flex flex-row justify-between 
      items-center'>
        <h2 className='text-white font-bold
        text-2xl'>
          Top Charts
        </h2>
        <Link to='/top-charts'>
          <p className='text-gray-300 text-base
          cursor-pointer'>
            see more
          </p>
        </Link>
      </div>

      <div className='mt-4 flex flex-col gap-1'>
        {topPlays?.map((song, i)=>(
          <TopChartCard 
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={() => handlePlayClick(song, i)}
          />))}
      </div>
    </div>
    <div className="w-full flex flex-col mt-8">
      <div className='flex flex-row justify-between 
        items-center'>
          <h2 className='text-white font-bold
          text-2xl'>
            Top Artists
          </h2>
          <Link to='/top-artists'>
            <p className='text-gray-300 text-base
            cursor-pointer'>
              see more
            </p>
          </Link>
        </div>
        <Swiper 
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        centeredSlides
        centeredSlidesBounds
        modules={[FreeMode]}
        className="mt-4"
        >
          {topPlays?.map((song, i) => (
              <SwiperSlide
                key={song?.key}
                style={{ width: '25%', height: 'auto'}}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt='name'
                    className='rounded-full w-full object-cover'
                  />
                </Link>
              </SwiperSlide>
          ))}
        </Swiper>
    </div>  
  </div>
  )
};

export default TopPlay;


/*
useRef allows us to persist values between renders
used to access dom element directly and mutable values
mutable meaning can be changed like object or array but not 
a primitive or like the number 5.

so it can hold a value that even when rendered wont change
so when we fire the useeffect on each render the value in the
useRef doenst change.

only returns one item an object named current
usuallly set the initial value to 0

can use ref element in a component to access it directly 
in the DOM. when we set the ref to a useRef variable 
then we can call a focus function on a button click which will
change the value of the object and in turn fire a function that 
applies to that DOM element

SWIPER

swiper is just a library that creates really cool scroll animations
and items, it has specific attributes in its react components
like slidePerView which is stating how many items will be visible 
in the swiper component at one time.

spaceBetween just the pixels between the components

freeMode is a property to make the movement smooth not snappy

centeredSlides is a boolean attribute that centers the active slides: slides that are 
being shown to the user. 

centeredSlidesBounds is another boolean attribute that makes sure
that the slides that are not active and moving into view are visible 
when we set the centeredSlides to be true

modules attribute is an initialization for styles to the component
so if we want a nav bar slider we have that option, in our case 
we used a FreeMode for the freemode module in swiper.

<SwiperSlide> is jsut a wrapper component for the individual slide.
Allows us to structure and organize content of each slide.
Gave it a key since there will be multiple components being rendered.

Swiper component works by iterating through the SwiperSlide 
components

Tailwind properties
flex-1: 
will determine how the items will grow and shrink, so if 
we set a div to flex-1 it will grow and take up as much space as 
possible while the other will have a stagnant width, and if we set 
the flex-basis to something it will just stay at that value.
But if both grow and shrink at 1 they will take up the same space in the div.

max-w-[500px]: sets max-width of element to 500 on that size
max-w-full: sets width to 100% usually
text-base: sets a basic line height and size
gap-1: gap property to a size of 1

*/
