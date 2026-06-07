import { useEdit } from '@/context/EditContext';
import { tableBoundaries, tableSizes, type TableData } from '@/types'
import React, { useRef } from 'react'

interface TableProps {
  table: TableData;
  selected: boolean;
  moving: boolean;
  collides: boolean;
  startMoving: (table: TableData, startPosition: {x: number; y: number;})=> void;
}


const Table = ({table, selected, moving, startMoving, collides}: TableProps) => {
  const dragged = useRef(false);
  const { updateSelected } = useEdit();
  const style = selected ? 'solid' : table.category === 'kids' ? 'dashed' : '';
  const width = selected ? 3 : table.category === 'competition' ? 5 : 3;
  const color = selected ? 'cyan' : `color-mix(in srgb, ${table.color} 50%, black)`;
  const outline = (moving && dragged.current) || collides ? `${tableBoundaries[table.type]}px solid rgba(255, 0, 0, 0.1)` : '';
  return (
    <div style={{
      height: `${tableSizes[table.type].y}px`, width: `${tableSizes[table.type].x}px`, 
      top: `${table.position.y}px`, left: `${table.position.x}px`, 
      backgroundColor: `color-mix(in srgb, ${table.color} ${table.status * 10}%, white)`,
      borderColor: color, 
      borderWidth: width,
      borderStyle: style,
      outline: outline
    }} 
      className={`absolute z-${moving? 10 : 0} touch-none`}
      onClick={() => !dragged.current && updateSelected(table.id)}
      onMouseMove={() => dragged.current = true}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragged.current = false;
        if (!table['isLocked']) startMoving(table, {x: e.clientX, y: e.clientY})}}
      onTouchStart={(e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        if (!table['isLocked']) startMoving(table, {x: touch.clientX, y: touch.clientY})}}>
      </div>
  )
}

export default Table