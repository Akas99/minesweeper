import { FC, useState, useEffect, SyntheticEvent } from "react";
import { useAppSelector, useAppDispatch } from "../hooks";
import bombPic from "../assets/icons/bomb.png";
import flag from "../assets/icons/flag.png";
import { getLose, getWin } from "../store/endgameSlice";
import { pauseTimer, startTimer } from "../store/timerSlice";
import "./DashboardEnd.css"
interface DashboardEndProps {
  last: number[][]
}
const DashboardEnd: FC<DashboardEndProps> = ({ last}) => {
  const { select } = useAppSelector((state) => state.selectLevel);
  
  const dispatch = useAppDispatch();
  interface myObject {
    number: number;
    isActive: boolean;
    besideBombs: number;
    marker: boolean;
  }

  const [newArray, setNewArray] = useState<myObject[][]>([]);

  useEffect(() => {
    const arr = last.map((el) => {
      return el.map((elem) => {
        return { number: elem, isActive: false, marker: false, besideBombs: 0 };
      });
    });
    setNewArray(arr);
  }, [last]);
  const rightButtonClick = (
    e: SyntheticEvent,
    index: number,
    parentIndex: number
  ) => {
    e.preventDefault();
    setNewArray(
      newArray.map((el, i) => {
        el.map((elem, ind) => {
          if (index === ind && !elem.isActive && parentIndex === i) {
            elem.marker = !elem.marker;
          }
          return elem;
        });
        return el;
      })
    );
  };
  const checkBomb = (
    besideBombs: number,
    isActive: boolean,
    marker: boolean,
    number: number,
    parentIndex: number,
    childIndex: number
  ) => {
    if (number === 1 && !marker && !isActive) {
      setNewArray(
        newArray.map((el, i) => {
          el.map((elem, ind) => {
            elem.isActive = true;
            if (elem.number === 0) {
              elem.besideBombs = 0;
            }
            return elem;
          });
          return el;
        })
      );
      dispatch(getLose(true));
      dispatch(pauseTimer())
    }
    if (!marker && !isActive && number === 0) {
      let sum = 0;
      dispatch(startTimer());
      if (
        parentIndex === 0 &&
        childIndex > 0 &&
        childIndex < last[0].length - 1
      ) {
        sum +=
          last[parentIndex][childIndex - 1] +
          last[parentIndex][childIndex + 1] +
          last[parentIndex + 1][childIndex - 1] +
          last[parentIndex + 1][childIndex] +
          last[parentIndex + 1][childIndex + 1];
      }
      if (parentIndex === 0 && childIndex === 0) {
        sum +=
          last[parentIndex][childIndex + 1] +
          last[parentIndex + 1][childIndex] +
          last[parentIndex + 1][childIndex + 1];
      }
      if (parentIndex === 0 && childIndex === last[0].length - 1) {
        sum +=
          last[parentIndex][childIndex - 1] +
          last[parentIndex + 1][childIndex] +
          last[parentIndex + 1][childIndex - 1];
      }
      if (
        parentIndex === last.length - 1 &&
        childIndex > 0 &&
        childIndex < last[0].length - 1
      ) {
        sum +=
          last[parentIndex][childIndex - 1] +
          last[parentIndex][childIndex + 1] +
          last[parentIndex - 1][childIndex - 1] +
          last[parentIndex - 1][childIndex] +
          last[parentIndex - 1][childIndex + 1];
      }
      if (parentIndex === last.length - 1 && childIndex === 0) {
        sum +=
          last[parentIndex][childIndex + 1] +
          last[parentIndex - 1][childIndex] +
          last[parentIndex - 1][childIndex + 1];
      }
      if (
        parentIndex === last.length - 1 &&
        childIndex === last[0].length - 1
      ) {
        sum +=
          last[parentIndex][childIndex - 1] +
          last[parentIndex - 1][childIndex] +
          last[parentIndex - 1][childIndex - 1];
      }
      if (
        parentIndex > 0 &&
        parentIndex < last.length - 1 &&
        childIndex !== 0 &&
        childIndex !== last[0].length - 1
      ) {
        sum +=
          last[parentIndex][childIndex - 1] +
          last[parentIndex][childIndex + 1] +
          last[parentIndex - 1][childIndex - 1] +
          last[parentIndex - 1][childIndex] +
          last[parentIndex - 1][childIndex + 1] +
          last[parentIndex + 1][childIndex - 1] +
          last[parentIndex + 1][childIndex] +
          last[parentIndex + 1][childIndex + 1];
      }
      if (
        childIndex === 0 &&
        parentIndex !== 0 &&
        parentIndex !== last.length - 1
      ) {
        sum +=
          last[parentIndex][childIndex + 1] +
          last[parentIndex - 1][childIndex] +
          last[parentIndex - 1][childIndex + 1] +
          last[parentIndex + 1][childIndex] +
          last[parentIndex + 1][childIndex + 1];
      }
      if (
        childIndex === last[0].length - 1 &&
        parentIndex !== 0 &&
        parentIndex !== last.length - 1
      ) {
        sum +=
          last[parentIndex][childIndex - 1] +
          last[parentIndex - 1][childIndex] +
          last[parentIndex - 1][childIndex - 1] +
          last[parentIndex + 1][childIndex] +
          last[parentIndex + 1][childIndex - 1];
      }
      let ask = 0;
      setNewArray(
        newArray.map((el, i, arr) => {
          el.map((elem, ind) => {
            if (elem.number === 0 && elem.isActive) {
              ask += 1;
            }
            if (ind === childIndex && i === parentIndex && sum !== 0) {
              elem.besideBombs = sum;
              elem.isActive = true;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind !== 0 &&
              i !== 0 &&
              ind !== el.length - 1 &&
              i !== arr.length - 1
            ) {
              let right = 0;
              let left = 0;
              let top = 0;
              let bottom = 0;
              if (arr[i][ind - 2]) {
                left =
                  arr[i][ind - 2].number +
                  arr[i][ind].number +
                  arr[i - 1][ind - 1].number +
                  arr[i + 1][ind - 1].number +
                  arr[i + 1][ind - 2].number +
                  arr[i + 1][ind].number +
                  arr[i - 1][ind - 2].number +
                  arr[i - 1][ind].number;
              } else if (!arr[i][ind - 2]) {
                left =
                  arr[i][ind].number +
                  arr[i - 1][ind - 1].number +
                  arr[i + 1][ind - 1].number +
                  arr[i + 1][ind].number +
                  arr[i - 1][ind].number;
              }
              if (arr[i][ind + 2]) {
                right =
                  arr[i][ind + 2].number +
                  arr[i][ind].number +
                  arr[i - 1][ind + 1].number +
                  arr[i + 1][ind + 1].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind + 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind + 2].number;
              } else if (!arr[i][ind + 2]) {
                right =
                  arr[i][ind].number +
                  arr[i - 1][ind + 1].number +
                  arr[i + 1][ind + 1].number +
                  arr[i - 1][ind].number +
                  arr[i + 1][ind].number;
              }
              if (arr[i - 2]) {
                top =
                  arr[i - 2][ind].number +
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind + 1].number +
                  arr[i + 1][ind + 1].number +
                  arr[i + 1][ind - 1].number +
                  arr[i - 2][ind - 1].number +
                  arr[i - 2][ind + 1].number;
              } else if (!arr[i - 2]) {
                top =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind + 1].number +
                  arr[i + 1][ind + 1].number +
                  arr[i + 1][ind - 1].number;
              }
              if (arr[i + 2]) {
                bottom =
                  arr[i + 2][ind].number +
                  arr[i + 2][ind - 1].number +
                  arr[i + 2][ind + 1].number +
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind - 1].number +
                  arr[i + 1][ind - 1].number +
                  arr[i + 1][ind + 1].number;
              } else if (!arr[i + 2]) {
                bottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind - 1].number +
                  arr[i + 1][ind - 1].number +
                  arr[i + 1][ind + 1].number;
              }
              elem.isActive = true;
              arr[i + 1][ind].isActive = true;
              arr[i + 1][ind].besideBombs = bottom;
              arr[i - 1][ind].isActive = true;
              arr[i - 1][ind].besideBombs = top;
              arr[i][ind - 1].isActive = true;
              arr[i][ind - 1].besideBombs = left;
              arr[i][ind + 1].isActive = true;
              arr[i][ind + 1].besideBombs = right;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind === 0 &&
              i === 0 &&
              ind !== el.length - 1 &&
              i !== arr.length - 1
            ) {
              let bottom = 0;
              let right = 0;
              let rightBottom = 0;
              elem.isActive = true;
              bottom =
                arr[i][ind].number +
                arr[i][ind + 1].number +
                arr[i + 1][ind + 1].number +
                arr[i + 2][ind + 1].number +
                arr[i + 2][ind].number;
              right =
                arr[i][ind].number +
                arr[i + 1][ind].number +
                arr[i + 1][ind + 1].number +
                arr[i + 1][ind + 2].number +
                arr[i][ind + 2].number;
              rightBottom =
                arr[i][ind].number +
                arr[i][ind + 1].number +
                arr[i][ind + 2].number +
                arr[i + 1][ind].number +
                arr[i + 1][ind + 2].number +
                arr[i + 2][ind].number +
                arr[i + 2][ind + 1].number +
                arr[i + 2][ind + 2].number;
              arr[i][ind + 1].isActive = true;
              arr[i][ind + 1].besideBombs = right;
              arr[i + 1][ind].isActive = true;
              arr[i + 1][ind].besideBombs = bottom;
              arr[i + 1][ind + 1].isActive = true;
              arr[i + 1][ind + 1].besideBombs = rightBottom;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind !== 0 &&
              i === 0 &&
              ind === el.length - 1 &&
              i !== arr.length - 1
            ) {
              let bottom = 0;
              let left = 0;
              let leftBottom = 0;
              elem.isActive = true;
              bottom =
                arr[i][ind].number +
                arr[i][ind - 1].number +
                arr[i + 1][ind - 1].number +
                arr[i + 2][ind].number +
                arr[i + 2][ind - 1].number;
              left =
                arr[i][ind].number +
                arr[i + 1][ind].number +
                arr[i + 1][ind - 1].number +
                arr[i + 1][ind - 2].number +
                arr[i][ind].number;
              leftBottom =
                arr[i][ind].number +
                arr[i][ind - 1].number +
                arr[i][ind - 2].number +
                arr[i + 1][ind].number +
                arr[i + 1][ind - 2].number +
                arr[i + 2][ind].number +
                arr[i + 2][ind - 1].number +
                arr[i + 2][ind - 2].number;
              arr[i + 1][ind].isActive = true;
              arr[i + 1][ind].besideBombs = bottom;
              arr[i][ind - 1].isActive = true;
              arr[i][ind - 1].besideBombs = left;
              arr[i + 1][ind - 1].isActive = true;
              arr[i + 1][ind - 1].besideBombs = leftBottom;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind === 0 &&
              i !== 0 &&
              ind !== el.length - 1 &&
              i === arr.length - 1
            ) {
              let top = 0;
              let right = 0;
              let rightTop = 0;
              elem.isActive = true;
              top =
                arr[i][ind].number +
                arr[i][ind + 1].number +
                arr[i - 1][ind + 1].number +
                arr[i - 2][ind].number +
                arr[i - 2][ind + 1].number;
              right =
                arr[i][ind].number +
                arr[i - 1][ind].number +
                arr[i - 1][ind + 1].number +
                arr[i - 1][ind + 2].number +
                arr[i][ind + 2].number;
              rightTop =
                arr[i][ind].number +
                arr[i][ind + 1].number +
                arr[i][ind + 2].number +
                arr[i - 1][ind].number +
                arr[i - 1][ind + 2].number +
                arr[i - 2][ind].number +
                arr[i - 2][ind + 1].number +
                arr[i - 2][ind + 2].number;
              arr[i][ind + 1].isActive = true;
              arr[i][ind + 1].besideBombs = right;
              arr[i - 1][ind].isActive = true;
              arr[i - 1][ind].besideBombs = top;
              arr[i - 1][ind + 1].isActive = true;
              arr[i - 1][ind + 1].besideBombs = rightTop;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind !== 0 &&
              i !== 0 &&
              ind === el.length - 1 &&
              i === arr.length - 1
            ) {
              let top = 0;
              let left = 0;
              let leftTop = 0;
              elem.isActive = true;
              top =
                arr[i][ind].number +
                arr[i][ind - 1].number +
                arr[i - 1][ind - 1].number +
                arr[i - 2][ind].number +
                arr[i - 2][ind - 1].number;
              left =
                arr[i][ind].number +
                arr[i - 1][ind].number +
                arr[i - 1][ind - 1].number +
                arr[i - 1][ind - 2].number +
                arr[i][ind - 2].number;
              leftTop =
                arr[i][ind].number +
                arr[i][ind - 1].number +
                arr[i][ind - 2].number +
                arr[i - 1][ind].number +
                arr[i - 1][ind - 2].number +
                arr[i - 2][ind].number +
                arr[i - 2][ind - 1].number +
                arr[i - 2][ind - 2].number;
              arr[i - 1][ind].isActive = true;
              arr[i - 1][ind].besideBombs = top;
              arr[i][ind - 1].isActive = true;
              arr[i][ind - 1].besideBombs = left;
              arr[i - 1][ind - 1].isActive = true;
              arr[i - 1][ind - 1].besideBombs = leftTop;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind !== 0 &&
              i === 0 &&
              ind !== el.length - 1 &&
              i !== arr.length - 1
            ) {
              let bottom = 0;
              let left = 0;
              let right = 0;
              let rightBottom = 0;
              let leftBottom = 0;
              elem.isActive = true;
              bottom =
                arr[i][ind].number +
                arr[i][ind - 1].number +
                arr[i][ind + 1].number +
                arr[i + 1][ind - 1].number +
                arr[i + 1][ind + 1].number +
                arr[i + 2][ind - 1].number +
                arr[i + 2][ind].number +
                arr[i + 2][ind + 1].number;
              if (arr[i][ind + 2]) {
                rightBottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind + 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind + 2].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind + 1].number +
                  arr[i + 2][ind + 2].number;
                right =
                  arr[i][ind].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind + 1].number +
                  arr[i + 1][ind + 2].number +
                  arr[i][ind + 2].number;
              } else if (!arr[i][ind + 2]) {
                rightBottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i + 1][ind].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind + 1].number;
                right =
                  arr[i][ind].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind + 1].number;
              }
              if (arr[i][ind - 2]) {
                leftBottom =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind - 2].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind - 1].number +
                  arr[i + 2][ind - 2].number;
                left =
                  arr[i][ind].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind - 1].number +
                  arr[i + 1][ind - 2].number +
                  arr[i][ind - 2].number;
              } else if (!arr[i][ind - 2]) {
                leftBottom =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i + 1][ind].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind - 1].number;
                left =
                  arr[i][ind].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind - 1].number;
              }
              arr[i + 1][ind].isActive = true;
              arr[i + 1][ind].besideBombs = bottom;
              arr[i][ind - 1].isActive = true;
              arr[i][ind - 1].besideBombs = left;
              arr[i][ind + 1].isActive = true;
              arr[i][ind + 1].besideBombs = right;
              arr[i + 1][ind + 1].isActive = true;
              arr[i + 1][ind + 1].besideBombs = rightBottom;
              arr[i + 1][ind - 1].isActive = true;
              arr[i + 1][ind - 1].besideBombs = leftBottom;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind !== 0 &&
              i !== 0 &&
              ind !== el.length - 1 &&
              i === arr.length - 1
            ) {
              let top = 0;
              let left = 0;
              let right = 0;
              let leftTop = 0;
              let rightTop = 0;
              elem.isActive = true;
              top =
                arr[i][ind].number +
                arr[i][ind - 1].number +
                arr[i][ind + 1].number +
                arr[i - 1][ind - 1].number +
                arr[i - 1][ind + 1].number +
                arr[i - 2][ind - 1].number +
                arr[i - 2][ind].number +
                arr[i - 2][ind + 1].number;
              if (arr[i][ind + 2]) {
                rightTop =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind + 2].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind + 2].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind + 1].number +
                  arr[i - 2][ind + 2].number;
                right =
                  arr[i][ind].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind + 1].number +
                  arr[i - 1][ind + 2].number +
                  arr[i][ind + 2].number;
              } else if (!arr[i][ind + 2]) {
                rightTop =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i - 1][ind].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind + 1].number;
                right =
                  arr[i][ind].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind + 1].number;
              }
              if (arr[i][ind - 2]) {
                leftTop =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 2].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind - 2].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind - 1].number +
                  arr[i - 2][ind - 2].number;
                left =
                  arr[i][ind].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind - 1].number +
                  arr[i - 1][ind - 2].number +
                  arr[i][ind - 2].number;
              } else if (!arr[i][ind - 2]) {
                leftTop =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i - 1][ind].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind - 1].number;
                left =
                  arr[i][ind].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind - 1].number;
              }
              arr[i - 1][ind].isActive = true;
              arr[i - 1][ind].besideBombs = top;
              arr[i][ind - 1].isActive = true;
              arr[i][ind - 1].besideBombs = left;
              arr[i][ind + 1].isActive = true;
              arr[i][ind + 1].besideBombs = right;
              arr[i - 1][ind + 1].isActive = true;
              arr[i - 1][ind + 1].besideBombs = rightTop;
              arr[i - 1][ind - 1].isActive = true;
              arr[i - 1][ind - 1].besideBombs = leftTop;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind === 0 &&
              i !== 0 &&
              ind !== el.length - 1 &&
              i !== arr.length - 1
            ) {
              let bottom = 0;
              let top = 0;
              let right = 0;
              let rightTop = 0;
              let rightBottom = 0;
              elem.isActive = true;
              right =
                arr[i][ind].number +
                arr[i - 1][ind].number +
                arr[i + 1][ind].number +
                arr[i - 1][ind + 1].number +
                arr[i - 1][ind + 2].number +
                arr[i][ind + 2].number +
                arr[i + 1][ind + 1].number +
                arr[i + 1][ind + 2].number;
              if (arr[i + 2]) {
                rightBottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind + 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind + 2].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind + 1].number +
                  arr[i + 2][ind + 2].number;
                bottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i + 1][ind + 1].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind + 1].number;
              } else if (!arr[i + 2]) {
                rightBottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind + 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind + 2].number;
                bottom =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i + 1][ind + 1].number;
              }
              if (arr[i - 2]) {
                rightTop =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind + 2].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind + 2].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind + 1].number +
                  arr[i - 2][ind + 2].number;
                top =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i - 1][ind + 1].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind + 1].number;
              } else if (!arr[i - 2]) {
                rightTop =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i][ind + 2].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind + 2].number;
                top =
                  arr[i][ind].number +
                  arr[i][ind + 1].number +
                  arr[i - 1][ind + 1].number;
              }
              arr[i][ind + 1].isActive = true;
              arr[i][ind + 1].besideBombs = right;
              arr[i - 1][ind].isActive = true;
              arr[i - 1][ind].besideBombs = top;
              arr[i + 1][ind].isActive = true;
              arr[i + 1][ind].besideBombs = bottom;
              arr[i - 1][ind + 1].isActive = true;
              arr[i - 1][ind + 1].besideBombs = rightTop;
              arr[i + 1][ind + 1].isActive = true;
              arr[i + 1][ind + 1].besideBombs = rightBottom;
            }
            if (
              ind === childIndex &&
              i === parentIndex &&
              sum === 0 &&
              ind !== 0 &&
              i !== 0 &&
              ind === el.length - 1 &&
              i !== arr.length - 1
            ) {
              let bottom = 0;
              let top = 0;
              let left = 0;
              let leftTop = 0;
              let leftBottom = 0;
              elem.isActive = true;
              left =
                arr[i][ind].number +
                arr[i + 1][ind].number +
                arr[i - 1][ind].number +
                arr[i - 1][ind - 1].number +
                arr[i + 1][ind - 1].number +
                arr[i][ind - 2].number +
                arr[i + 1][ind - 2].number +
                arr[i - 1][ind - 2].number;
              if (arr[i + 2]) {
                leftBottom =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind - 2].number +
                  arr[i + 2][ind].number +
                  arr[i + 2][ind - 1].number +
                  arr[i + 2][ind - 2].number;
                bottom =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 1].number +
                  arr[i + 2][ind - 1].number +
                  arr[i + 2][ind].number;
              } else if (!arr[i + 2]) {
                leftBottom =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 2].number +
                  arr[i + 1][ind].number +
                  arr[i + 1][ind - 2].number;
                bottom =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i + 1][ind - 1].number;
              }
              if (arr[i - 2]) {
                leftTop =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 2].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind - 2].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind - 1].number +
                  arr[i - 2][ind - 2].number;
                top =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i - 1][ind - 1].number +
                  arr[i - 2][ind].number +
                  arr[i - 2][ind - 1].number;
              } else if (!arr[i - 2]) {
                leftTop =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i][ind - 2].number +
                  arr[i - 1][ind].number +
                  arr[i - 1][ind - 2].number;
                top =
                  arr[i][ind].number +
                  arr[i][ind - 1].number +
                  arr[i - 1][ind - 1].number;
              }
              arr[i - 1][ind].isActive = true;
              arr[i - 1][ind].besideBombs = top;
              arr[i + 1][ind].isActive = true;
              arr[i + 1][ind].besideBombs = bottom;
              arr[i][ind - 1].isActive = true;
              arr[i][ind - 1].besideBombs = left;
              arr[i - 1][ind - 1].isActive = true;
              arr[i - 1][ind - 1].besideBombs = leftTop;
              arr[i + 1][ind - 1].isActive = true;
              arr[i + 1][ind - 1].besideBombs = leftBottom;
            }
            return elem;
          });
          return el;
        })
      );
      if (select === "легкий" && ask === 50 - 1) {
        dispatch(getWin(true));
        dispatch(pauseTimer())
      }
      if (select === "средний" && ask === 155 - 1) {
        dispatch(getWin(true));
        dispatch(pauseTimer())
      }
      if (select === "тяжелый" && ask === 357 - 1) {
        dispatch(getWin(true));
        dispatch(pauseTimer())
      }
    }
  };
  const cellClassName1 =
    "bg-red-200 rounded-lg text-xs m-[1.5px] w-4 h-4 flex justify-center items-center sm:h-8 sm:w-8 sm:text-sm md:w-9 md:h-9 md:text-base lg:w-10 lg:h-10 lg:text-lg 2xl:w-11 2xl:h-11 2xl:text-2xl";
  const cellClassName2 =
    "bg-red-200 rounded-lg text-xs m-[1.5px] w-6 h-6 flex justify-center items-center sm:h-9 sm:w-9 sm:text-sm md:w-10 md:h-10 md:text-base lg:w-11 lg:h-11 lg:text-lg 2xl:w-12 2xl:h-12 2xl:text-2xl";
  const cellClassName3 =
    "bg-red-200 rounded-lg text-xs m-[1.5px] w-10 h-10 flex justify-center items-center sm:w-12 sm:h-12 sm:text-sm md:w-14 md:h-14 md:text-base lg:w-16 lg:h-16 lg:text-lg 2xl:w-20 2xl:h-20 2xl:text-2xl";
  return (
    <div className="flex flex-col">
      {newArray.map((el, index) => {
        return (
          <div key={index} className="flex">
            {el.map((elem, i) => {
              return (
                <div
                  onClick={() =>
                    checkBomb(
                      elem.besideBombs,
                      elem.isActive,
                      elem.marker,
                      elem.number,
                      index,
                      i
                    )
                  }
                  onContextMenu={(e) => rightButtonClick(e, i, index)}
                  className={
                    !elem.isActive && select === "тяжелый"
                      ? `${cellClassName1} cursor-pointer`
                      : !elem.isActive && select === "средний"
                      ? `${cellClassName2} cursor-pointer`
                      : !elem.isActive && select === "легкий"
                      ? `${cellClassName3} cursor-pointer`
                      : elem.isActive && select === "тяжелый"
                      ? `${cellClassName1} opacity-30`
                      : elem.isActive && select === "средний"
                      ? `${cellClassName2} opacity-30`
                      : elem.isActive && select === "легкий"
                      ? `${cellClassName3} opacity-30`
                      : ""
                  }
                  key={i}
                >
                  {/* {elem.number === 1 && !elem.isActive && !elem.marker ? (
                    <img className="w-9/12 h-9/12" src={bombPic} alt="" />
                  ) : elem.number === 0 && elem.isActive && !elem.marker ? (
                    elem.besideBombs
                  ) : elem.marker && !elem.isActive ? (
                    <img className="w-9/12 h-9/12" src={flag} alt="" />
                  ) : (
                    ""
                  )} */}
                  {elem.isActive &&
                  elem.number === 0 &&
                  elem.besideBombs !== 0 ? (
                    elem.besideBombs
                  ) : elem.isActive && elem.number === 1 ? (
                    <img className="w-9/12 h-9/12" src={bombPic} alt="" />
                  ) : elem.marker ? (
                    <img className="w-9/12 h-9/12" src={flag} alt="" />
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export default DashboardEnd;
