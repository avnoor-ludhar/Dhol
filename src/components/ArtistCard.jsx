import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 
    bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg
    cursor-pointer" onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}>
      <img alt="artist" src={track?.images?.coverart} className="
      w-full h-56 rounded-lg"/>
      <p className="mt-4 font-semibold text-lg text-white truncate">{track?.subtitle}</p>
    </div>
  )
};

export default ArtistCard;

/*
useNavigate is a react router dom hook that is used to 
move to different pages, provides a function that allows us to 
navigate to different routes in React application.

navigate('/other-route') literally just a function 
to switch urls.

remember need call back on the function since we are in react it needs to not fire 
on render and we need to handle the default behaviour of it.

useCallback is usually used in this case when we need it to fire on a 
specific case
*/