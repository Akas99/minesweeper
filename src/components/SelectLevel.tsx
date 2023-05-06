import { choоseSelet } from "../store/selectLevelSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import {ChangeEvent} from "react"
import { pauseTimer, zeroTimer } from "../store/timerSlice";
const SelectLevel = () => {
    const dispatch = useAppDispatch()
    const {select} = useAppSelector(state=>state.selectLevel)
    const akas = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(choоseSelet(e.target.value))
        dispatch(zeroTimer())
        dispatch(pauseTimer())
    }
    return (
        <>
        <select className="bg-main text-secondary" value={select} onChange={akas}>
            <option value="легкий">легкий</option>
            <option value="средний">средний</option>
            <option value="тяжелый">тяжелый</option>
        </select>
        </>
    )
}
export default SelectLevel;