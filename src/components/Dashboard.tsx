import { FC,useState, useEffect } from "react";
import { useAppSelector } from "../hooks";
import DashboardEnd from "./DashboardEnd";

interface DashboardBlockProps {
  bombsArray:number[]
}

const DashboardBlock: FC<DashboardBlockProps> = ({bombsArray}) => {
  const { select } = useAppSelector((state) => state.selectLevel);
  const { win, lose } = useAppSelector((state) => state.endgame);
  const { count } = useAppSelector((state) => state.theme);
  const [last, setLast]=useState<number[][]>([])

  useEffect(()=>{
    if(!win && !lose){
    if (select === "средний") {
      let sum=0
      const rowArray: number[][] = Array.from({length: 19}, () => Array(10).fill(0));
      for(let i=0;i<rowArray.length;i++){
        while(sum !== bombsArray[i]){
          let akas=Math.floor(Math.random()*10)
          if(rowArray[i][akas]===0){
            rowArray[i][akas]=1
            sum+=rowArray[i][akas]
          }  
        }
        sum=0
      }
      setLast(rowArray)
    }
    if (select === "легкий") {
      let sum=0
      const rowArray: number[][] = Array.from({length: 10}, () => Array(6).fill(0));
      for(let i=0;i<rowArray.length;i++){
        while(sum !== bombsArray[i]){
          let akas=Math.floor(Math.random()*6)
          if(rowArray[i][akas]===0){
            rowArray[i][akas]=1
            sum+=rowArray[i][akas]
          }  
        }
        sum=0
      }
       setLast(rowArray)
    }
    if (select === "тяжелый") {
      let sum=0
      const rowArray: number[][] = Array.from({length: 27}, () => Array(16).fill(0));
      for(let i=0;i<rowArray.length;i++){
        while(sum !== bombsArray[i]){
          let akas=Math.floor(Math.random()*16)
          if(rowArray[i][akas]===0){
            rowArray[i][akas]=1
            sum+=rowArray[i][akas]
          }  
        }
        sum=0
      }
       setLast(rowArray)
    }
  }
  },[select,bombsArray,win, lose, count])
  
  return (
    <div className="flex container justify-center items-center flex-col">
      <DashboardEnd last={last} />
    </div>
  );
};
export default DashboardBlock;
