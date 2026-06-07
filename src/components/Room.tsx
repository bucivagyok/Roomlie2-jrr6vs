import { tableBoundaries, tableSizes, type Size, type TableData } from '@/types';
import Table from '@/components/Table';
import { useEdit } from '@/context/EditContext';
import { useState } from 'react';

interface RoomProps {
    size: Size;
}


const Room = ({size}: RoomProps) => {
    const { tables, selected, updateTable, endMoving } = useEdit();
    const [moving, setMoving] = useState<TableData>();
    const [offset, setOffset] = useState<{x: number, y: number}>();

    function startMoving(table: TableData, cursor: {x: number, y: number}) {
        setMoving(prev => prev == undefined ? table : prev);
        setOffset({
            x: cursor.x - table.position.x,
            y: cursor.y - table.position.y,
        });
    }

    function moveTable(x: number, y:number) {
        if (moving != undefined) {
            setMoving(prev => {
            if (!prev) return prev;
            return {...prev, position: {x: x, y: y}}
        })
        updateTable(moving.id, moving);
        }
    }

    async function stopMoving() {
        if (tables.every(x => moving?.id == x.id || !collides(moving, x))) {
            await endMoving(moving!.id, moving!.position)
            setMoving(undefined)
        }
    }

    function collides(first: TableData | undefined, other: TableData): boolean{
        if (first) {
            if (first.position.x - tableBoundaries[first.type] < other.position.x + tableSizes[other.type].x &&
                first.position.x + tableSizes[first.type].x + tableBoundaries[first.type] > other.position.x &&
                first.position.y - tableBoundaries[first.type] < other.position.y + tableSizes[other.type].y &&
                first.position.y + tableSizes[first.type].y + tableBoundaries[first.type] > other.position.y ||
                first.position.x - tableBoundaries[first.type] < 0 ||
                first.position.x + tableSizes[first.type].x + tableBoundaries[first.type] > size.x ||
                first.position.y - tableBoundaries[first.type] < 0 ||
                first.position.y + tableSizes[first.type].y + tableBoundaries[first.type] > size.y)
            {
                return true;
            }
        }
        return false;
    }

  return (
    <div style={{width: `${size.x}px`, height: `${size.y}px`}} className="border border-foreground rounded relative"
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
            if (offset) {
                moveTable(e.clientX - offset.x, e.clientY - offset.y);
            }
            if (e.buttons !== 1 && tables.every(x => moving?.id == x.id || !collides(moving, x))) {
                setMoving(undefined)
            }
        }}
        onMouseUp={() => {stopMoving()}}
        onTouchMove={(e: React.TouchEvent<HTMLDivElement>) => {
            e.preventDefault();
            const touch = e.touches[0];
            if (offset) {
                moveTable(touch.clientX - offset.x, touch.clientY - offset.y);
            }
        }}
        onTouchEnd={() => {
            if (tables.every(x => moving?.id == x.id || !collides(moving, x))) {

                setMoving(undefined);
            }
        }}
        >
        {
            tables.map(current => {
                const rendering = current.id === moving?.id ? moving : current
                return (
                    <Table key={current.id} table={rendering} selected={current.id == selected?.id} moving={current.id == moving?.id} startMoving={startMoving} collides={!tables.every(x => current.id == x.id || !collides(rendering, x))}/>
                )
            })
        }
    </div>
  )
}

export default Room