import MyButton from "../ui/MyButton";
import SelectLevel from "./SelectLevel";
import Timer from "./Timer";
import changeThemeFunction from "../helpers/ThemeSwitch";
import { useAppDispatch, useAppSelector } from "../hooks";
import { plusCount, setToggle } from "../store/themeSlice";
import reload from "../assets/icons/sync.png";
import MyToggle from "../ui/MyToggle";
import { pauseTimer, zeroTimer } from "../store/timerSlice";

const Footer = () => {
  const dispatch = useAppDispatch();
  const { toggle } = useAppSelector((state) => state.theme);
  const click = () => {
    dispatch(plusCount());
    dispatch(zeroTimer());
    dispatch(pauseTimer());
  };
  return (
    <div className="w-full bg-secondary fixed bottom-0 h-24">
      <div className="flex items-center w-full mt-2">
        <div className="w-1/2 flex flex-col items-center gap-y-2">
          <div className="w-1/2 flex justify-center">
            <MyToggle
              click={() => changeThemeFunction(dispatch, setToggle, toggle)}
            />
          </div>
          <div className="w-1/2 flex justify-center">
            <MyButton name={reload} click={click} />
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center gap-y-2">
          <div className="w-1/2 flex justify-center">
            <SelectLevel />
          </div>
          <div className="w-1/2 flex justify-center">
            <Timer />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
