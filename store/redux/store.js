import { configureStore} from '@reduxjs/toolkit'
import favoritesReducer from './favorites' // default export

export const store = configureStore({
    reducer: {
        favoriteMeals: favoritesReducer
    }
})