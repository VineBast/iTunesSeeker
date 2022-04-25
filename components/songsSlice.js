import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
    name: "songs",
    initialState: [],
    reducers: {
        add: (state, action) => {
            let id = state.length;
            return [...state, { song: action.payload }]
        }
    }
});

export const { add } = songsSlice.actions;
export const songsSelector = (state) => state.songs;
export default songsSlice.reducer;