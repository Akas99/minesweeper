import { Link } from "react-router-dom";
import MyButton from "../ui/MyButton";
import "./OpenPage.css";

const OpenPage = () => {
  return (
    <div className="back w-full h-screen flex justify-center items-center flex-col">
      <div className="my-auto flex flex-col">
        <h1 className="mix">Minesweeper</h1>
        <Link to="/main" className="mx-auto">
        <p className="text-xs mb-3 sm:text-sm md:text-base lg:text-lg xl:text-xl mix3 mt-6">START</p>
        </Link>
      </div>
      <h3 className="mix2 text-2xs mb-3 sm:text-xs md:text-sm lg:text-base">
        developed by akas
      </h3>
    </div>
  );
};
export default OpenPage;
