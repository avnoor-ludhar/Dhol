import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
//useParams allows to get access to the song id 
//in our URL. hook to get route parameters from URL
import { useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
    const { id: artistId } = useParams();
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const {data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery({artistId, });
    
    if(isFetchingArtistDetails){
        return (<Loader title="Loading artist details"/>)
    }

    if(error){
        return (<Error />);
    }

    return(
        <div className='flex flex-col'>
            <DetailsHeader artistId={artistId} artistData={artistData} /> 
            
            <RelatedSongs 
                data = {Object.values(artistData?.songs)}
                artistId={artistId}
                isPlaying={isPlaying}
                activeSong={activeSong}
            />
        </div>
    )
};

export default ArtistDetails;

/*
couple notes when passing in ids for query params, pass it in as
a parameter to the function call. Also can rename objects with a 
: like the isFetching: isFetchingSongDetails when dereferencing

?. is an optional operator that means if artist data is null or undefined it will 
short circuit and return undefined and not cause an error.

Object.values(artistData?.song) this is a built in function in 
JS that takes in an object so in our case the artistData?.song takes
the values of all the properties and puts it into an array.
So if we had 10 songs in our song property of that artistData it will 
create an array for all the songs.

wont work because its deprecated
*/