import {useState, useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

import {Error, Loader, SongCard} from '../Components';

const CountryTracks = () =>{
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state);
    const {data, isFetching, error} = useGetSongsByCountryQuery(country);

    useEffect(()=>{
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_oRpp465iGp9v6CC3sAt9nE9FmKLSX&ipAddress=8.8.8.8
        `).then((res) => setCountry(res?.data?.location?.country))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
        //at_oRpp465iGp9v6CC3sAt9nE9FmKLSX
    }, [country])

    if(isFetching && loading){
        return (<Loader title="Loading songs 
    around you"/>)
    } 

    if(error && country) {
        return(<Error />)
    }
    return (
        <div className='flex flex-col'>
            <h2 className='font-bold text-3xl 
            text-white text-left mt-4 mb-10'>
                Around You <span className='font-black'>{country}</span>
            </h2>
            <div className='flex flex-wrap sm:justify-start
            justify-center gap-8'>
                {data?.map((song, i) =>(
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

export default CountryTracks;

/*
going to use the geoipify api to find the country you are 
currently in. Just an api for finding the location your IP is in

we can add a finally method after our catch in our promises
if we get an error and we dont get back the data(rejected) we want 
from that function then we go into finally either way

remember undefined is treated as false in react

font-black is a property for very bold fonts
*/