import type { Size } from '@/types';
import React, { useRef } from 'react'

interface TopbarProps {
  size: Size;
  setSize: React.Dispatch<React.SetStateAction<Size>>;
}


const Topbar = ({size, setSize}: TopbarProps) => {
  //const { setTables } = useEdit();
  const xRef = useRef<HTMLInputElement>(null);
  const yRef = useRef<HTMLInputElement>(null);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
      e.preventDefault();
    }
  }

  const updateSize = () => {
    if (xRef.current?.value && yRef.current?.value && (Number(xRef.current?.value) != size.x || Number(yRef.current?.value) != size.y)) {
      setSize({x: Number(xRef.current?.value), y: Number(yRef.current?.value)})
      //setTables([]);
    }
  }

  return (
    <header className="flex bg-background h-16 items-center gap-12">
        <span>
          Terem mérete: 
          <input ref={xRef} className="w-28 text-center font-light" type="text" name="x" pattern="[0-9]*" inputMode="numeric" onKeyDown={handleKeyDown} defaultValue={size.x}/>
          x
          <input ref={yRef} className="w-28 text-center font-light" type="text" name="y" pattern="[0-9]*" inputMode="numeric" onKeyDown={handleKeyDown} defaultValue={size.y}/>
          <a onClick={updateSize}>Alkalmaz</a>
        </span>
        <span className="ml-auto text-gray-500">Alaphelyzet</span>
    </header>
  )
}

export default Topbar