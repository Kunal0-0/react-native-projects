import { createSlice } from '@reduxjs/toolkit'

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        ids: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.ids.push(action.payload.id) // action is an object provided by the redux and payload is a key of action object which we can use to transport any extra data. Here, for e.g, we want to transport ids of the favorite meal to push it into the ids array. So, to access the id of favorite meals we use payload key of action object
        },
        removeFavorite: (state, action) => {
            state.ids.splice(state.ids.indexOf(action.payload.id), 1);
        }
    }
});

export const { addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;