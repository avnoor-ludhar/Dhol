import { loader } from '../assets';


//when we use a call back for our component we can just destructure
//our props directly
const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center 
  flex-col">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || "loading..."}
    </h1>
  </div>
);

export default Loader;

//w-full tailwind class for width 100%
//object-contain sets the object-fit property 
//to contain, so usually used for images to keep aspect 
//ratio etc, so if we set object-fit: contain; keeps aspect
//ratio cover will clip image to fit