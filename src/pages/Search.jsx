import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams}  from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

import {Error, Loader, SongCard} from '../Components';

const Search = () =>{
  const { searchTerm } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state);
    const {data, isFetching, error} = useGetSongsBySearchQuery(searchTerm);

    //we will also be getting artists in the search
    //so instead we will go to tracks.hits and map through each song
    //so even when its an author or other data type it will get songs
    const songs = data?.tracks?.hits?.map((song) => song.track);

    if(isFetching){
        return (<Loader title="Loading top charts"/>)
    } 

    if(error) {
        return(<Error />)
    }
    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl 
            text-white text-left mt-4 mb-10'>
                Showing results for <span className='font-black'>{searchTerm}</span>
            </h2>
            <div className='flex flex-wrap sm:justify-start
            justify-center gap-8'>
                {songs?.map((song, i) =>(
                    <SongCard 
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
)};

export default Search;
