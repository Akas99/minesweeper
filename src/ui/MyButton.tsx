import { FC } from "react";
interface MyButtonProps {
  name: string;
  click?: () => void;
}
const MyButton: FC<MyButtonProps> = ({ name, click }) => {
  return (
    <div className="p-2 bg-main rounded-full cursor-pointer">
      <img
        className="w-6 h-6"
        onClick={click}
        src={name}
        alt=""
      />
    </div>
  );
};
export default MyButton;
