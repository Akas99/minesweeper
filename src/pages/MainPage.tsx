import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setToggle } from "../store/themeSlice";
import GameDashboard from "../components/GameDashboard";
import Modal from "../components/Modal";
import { getLose, getWin } from "../store/endgameSlice";
import Footer from "../components/Footer";
import { zeroTimer } from "../store/timerSlice";
 
const MainPage = () => {
  const dispatch = useAppDispatch();
  const winRenderFn = () => {
    dispatch(getWin(false));
    dispatch(zeroTimer())
  };
  const loseRenderFn = () => {
    dispatch(getLose(false));
    dispatch(zeroTimer())
  };
  const { win, lose } = useAppSelector((state) => state.endgame);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-mode",
        localStorage.getItem("theme")!
      );
    }
    if (localStorage.getItem("theme") === "dark") {
      dispatch(setToggle(true));
    }
    if (localStorage.getItem("theme") === "light") {
      dispatch(setToggle(false));
    }
  }, [dispatch]);
  return (
    <>
      {win ? <Modal renderFn={winRenderFn} /> : null}
      {lose ? <Modal renderFn={loseRenderFn} /> : null}
      <div
        id="app"
        className="min-h-screen pb-24 flex items-center flex-col"
      >
       
        <GameDashboard />
        <Footer />
      </div>
    </>
  );
};
export default MainPage;
