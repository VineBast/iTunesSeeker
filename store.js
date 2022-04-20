import { configureStore } from '@reduxjs/toolkit';
import songsReducer from "./components/songsSlice";

export default configureStore({
    reducer: {
        songs: songsReducer,
    },
});