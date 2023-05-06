import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface InitialState{
    toggle:boolean
    count:boolean
}
const initialState:InitialState = {
    toggle: false,
    count:false
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setToggle(state, action: PayloadAction<boolean>) {
            state.toggle = action.payload
        },
        plusCount(state) {
            state.count  = !state.count
        }
    },
});

  
export const {setToggle, plusCount } = themeSlice.actions;
export default themeSlice.reducer;