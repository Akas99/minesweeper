import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState{
    block:number
    summary:number
    arrayOfArrays:number[][]
}
const initialState:InitialState = {
    block: 0,
    summary:0,
    arrayOfArrays:[]
};

const besideBlock = createSlice({
    name: 'besideBlock',
    initialState,
    reducers: {
        checkBesideBlock(state,action:PayloadAction<number>){
            state.block=action.payload
        },
        totalSum(state,action:PayloadAction<number>){
            state.summary=action.payload
        },
        getAllArrays(state,action:PayloadAction<number[]>){
            state.arrayOfArrays.push(action.payload)
        }

    },
});

  
export const {checkBesideBlock, totalSum, getAllArrays } = besideBlock.actions;
export default besideBlock.reducer;