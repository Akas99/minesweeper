import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isRunning: boolean;
  time:number
}
const initialState: InitialState = {
  isRunning: false,
  time:0
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    startTimer: (state) => {
      state.isRunning = true;
    },
    pauseTimer: (state) => {
      state.isRunning = false;
    },
    zeroTimer: (state) => {
      state.time = 0;
    },
    plusTime:(state)=>{
      state.time+=1
    },
  },
});

export const { pauseTimer, startTimer, zeroTimer,plusTime } = timerSlice.actions;
export default timerSlice.reducer;


