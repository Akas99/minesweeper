import { useState } from 'react'
import { Switch } from '@headlessui/react'
import sun from "../assets/icons/night.png";

function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ')
}
interface ExampleProps{
    click:()=>void
}
export default function Example({click}:ExampleProps) {
  const [enabled, setEnabled] = useState(false)
  return (
    <Switch
      checked={enabled}
      onClick={click}
      onChange={setEnabled}
      className={classNames(
        enabled ? 'bg-primary' : 'bg-primary',
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      )}
    >
      <span className="sr-only">Use setting</span>
      <img src={sun}
        aria-hidden="true"
        alt=""
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
        )}
      />
    </Switch>
  )
}