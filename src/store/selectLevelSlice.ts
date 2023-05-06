import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState{
    select:string
}
const initialState:InitialState = {
    select: "средний",
};

const selectLevelSlice = createSlice({
    name: 'selectLevel',
    initialState,
    reducers: {
        choоseSelet(state, action:PayloadAction<string>){
            state.select = action.payload
        },
    },
});

  
export const { choоseSelet} = selectLevelSlice.actions;
export default selectLevelSlice.reducer;