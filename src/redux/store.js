import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
//just importing the redux api
import { shazamCoreApi } from './services/shazamCore';

//configures our redux or our context/shared state I think.

//NOTE he said its boiler plate code from redux toolkit
export const store = configureStore({
  //remember we use [] to use object for name in our objects
  //just connecting our store to our api
  reducer: {
    player: playerReducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  //concat merges function and redux usually has some middleware we do not see
  //so the getDefaultMiddleware just gets the default middleware which is jsut 
  //an array of all the middlware redux is already using and concatinating 
  //or adding our custom middleware which will be used in shazamCoreApi
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
