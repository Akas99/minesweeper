import React from "react";
import { useAppSelector } from "../hooks";
import Dashboard from "./Dashboard";

const GameDashboard = () => {
  const { select } = useAppSelector((state) => state.selectLevel);
  const bombsArray: number[] = [];
  let sum = 0;
  if (select === "средний") {
    bombsArray.length = 19;
    bombsArray.fill(0);
    while (sum !== 35) {
      const randomIndex = Math.floor(Math.random() * bombsArray.length);
      if (bombsArray[randomIndex] === 0) {
        const randomValue = Math.floor(Math.random() * 4) + 1;
        if (sum + randomValue <= 35) {
          bombsArray[randomIndex] = randomValue;
          sum += randomValue;
        }
      }
    }
  }
  if (select === "легкий") {
    bombsArray.length = 10;
    bombsArray.fill(0);
    while (sum !== 10) {
      const randomIndex = Math.floor(Math.random() * bombsArray.length);
      if (bombsArray[randomIndex] === 0) {
        const randomValue = Math.floor(Math.random() * 2) + 1;
        if (sum + randomValue <= 10) {
          bombsArray[randomIndex] = randomValue;
          sum += randomValue;
        }
      }
    }
  }
  if (select === "тяжелый") {
    bombsArray.length = 27;
    bombsArray.fill(0);
    while (sum !== 75) {
      const randomIndex = Math.floor(Math.random() * bombsArray.length);
      if (bombsArray[randomIndex] === 0) {
        const randomValue = Math.floor(Math.random() * 7) + 1;
        if (sum + randomValue <= 75) {
          bombsArray[randomIndex] = randomValue;
          sum += randomValue;
        }
      }
    }
  }
  return (
    <div className="py-8">
      <Dashboard bombsArray={bombsArray}/>
    </div>
  );
};
export default React.memo(GameDashboard);
