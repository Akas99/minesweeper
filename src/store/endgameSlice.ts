import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState{
    win:boolean
    lose:boolean
}
const initialState:InitialState = {
    win: false,
    lose: false,
};

const endgameSlice = createSlice({
    name: 'endgame',
    initialState,
    reducers: {
        getWin(state,action:PayloadAction<boolean>){
            state.win=action.payload
        },
        getLose(state,action:PayloadAction<boolean>){
            state.lose=action.payload
        }
    },
});

  
export const { getWin, getLose } = endgameSlice.actions;
export default endgameSlice.reducer;