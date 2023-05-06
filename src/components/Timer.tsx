import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { plusTime } from "../store/timerSlice";

const Timer = () => {
  const dispatch=useAppDispatch()
  const {isRunning, time}=useAppSelector(state=>state.timer)
  useEffect(()=>{
    let intervalId:any;
  
    if (isRunning === true) {
      intervalId = setInterval(() => {
        dispatch(plusTime())
      }, 1000);
    }
  
    return () => clearInterval(intervalId);
  }, [isRunning, dispatch])
  return (
    <div className="text-main">
      Score:{time}
    </div>
  );
};

export default Timer;
