import { Error, Loader, SongCard} from '../components'
//can dereference components from a folder
import { genres } from '../assets/constants.js'
//just a list of objects that contain key value pairs of 
//title:(human readable) and value: for us 2 different fields
import { useGetTopChartsQuery, useGetSongsByGenreQuery } from '../redux/services/shazamCore.js';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreListId } from '../redux/features/playerSlice.js';


const Discover = () => {
    //we have different cakes then the different selectors to this cakee
    //can now change the state using the reducer funcs
    const dispatch = useDispatch();
    //select a slice of the global state
    //useSelector sends back a callback function
    //that contains the entire state and we return
    //returnt the reducer we want in this case play pause
    //access by the name specified in slice
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);

    //remember RTK query gives access to a lot of things
    //isFetching is basically is loading
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');

    if(isFetching) return <Loader title="Loading songs..." />;

    if(error) return <Error />;

    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    // first div is for the select menu and h2
    // second div is for the entire songs related to the genre

    return (
    <div className ='flex flex-col'>
        <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>
            <select
                onChange={(e) => dispatch(selectGenreListId(e.target.value))}
                value={genreListId || 'pop'}
                className="bg-black text-gray-300 p-3 text-sm rounded-lg
                outline-none sm:mt-0 mt-5"
            >
                {genres.map((genre) => <option key={genre.value} 
                value={genre.value}> {genre.title} </option>)}
            </select>
        </div>
        <div className="flex flex-wrap sm:justify-center justify-start gap-8">
            {data?.map((song, i)=> 
                (<SongCard 
                    key={song.key}
                    song={song}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data}
                    i={i}
                />)
            )}
        </div>
    </div>
    );
}

//the images in the center of the music player fetched from an api


/*
notes for all tailiwnd classes at the bottom
w-full: width 100%
flex: display: flex
justify-between: justify-content space between
items-center: align-items: center;
sm:flex-row: media query for minimum width the styles will be applied at 
so when its above 640px it will have flex direction of everything 
in this div as row. we just reverse when we want the screen to be small
its the default when its large itll be whatever is after the sm:

flex-col: flex direction column
mt-4: margin-top: 1rem; 
mb-10: margin-bottom: 2.5rem
line-height: height of a line box, used to set distances between
lines of text.
bg-black is background colour 
text-colour-weight

<select></select> used to create a select menu or a drop-down list
contains <option> tags name attribute to reference form data
and value for the options and an id to dropdown list with a label

gap: jsut gaps between rows and columns usually used for grid

songs come from the api and loop through them
outline css property is the outline outside of the border.
outline-none just gets rid of the ugly ass outline
*/
export default Discover;


//positive of RTK is it handles all the errors for you.
//NOTE data?.map is the same as data && data.map 
//if data exists then it will call the map function

/*
note in react we dont always just use gloabl state to access things
we sometiems pass them down as props.

remember e.target is just an event objects values, specifically
allows us to get the value and name of the element that the onChange or 
onClick is called on

Redux also saves the genres in cache so it gets automatically
retrieved without the need to make another API call
*/