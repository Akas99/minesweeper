import { FC } from "react";
import { useAppSelector } from "../hooks";
import MyButton from "../ui/MyButton";
import reload from "../assets/icons/sync.png"

interface ModalProps {
    renderFn:()=>void
}
const Modal:FC<ModalProps>=({renderFn})=>{
    const { win, lose } = useAppSelector((state) => state.endgame);
    const { time } = useAppSelector((state) => state.timer);
    
    return (
    <div className="bg-purple-700 z-10 h-screen w-full fixed flex justify-center items-center flex-col gap-y-3">
        {win?"вы выиграли":""}
        {lose?"вы проиграли":""}
        {win?<p>Your score : {time}</p>:null}
        <MyButton click={renderFn} name={reload} />
    </div>
    )
}
export default Modal;