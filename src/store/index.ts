import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
import selectLevel from './selectLevelSlice';
import besideBlock from "./besideBlockSlice"
import endgameSlice from './endgameSlice';
import timerSlice from './timerSlice';

const store = configureStore({
    reducer: {
        theme: themeSlice,
        selectLevel:selectLevel,
        besideBlock:besideBlock,
        endgame:endgameSlice,
        timer:timerSlice
    },
});
export default store;

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch