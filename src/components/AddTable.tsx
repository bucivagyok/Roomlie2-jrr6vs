import { useEdit } from '@/context/EditContext';
import type { TableData } from '@/types';
import { useState } from 'react'
import { Button } from './ui/button';

interface AddTableProps {
    setStatus: React.Dispatch<React.SetStateAction<"success" | "error" | null>>;
    setLastAction: React.Dispatch<React.SetStateAction<"hozzáadás" | "módosítás" | null>>
}

const AddTable = ({setStatus, setLastAction}: AddTableProps) => {
    const {tables, addTable, startEditing } = useEdit();

    const [fresh, setFresh] = useState<TableData>({
        "id": tables.map(x => x.id).reduce((max, curr) => curr > max ? curr : max, 0)+1,
        "type": "",
        "category": "",
        "color": "",
        "status": 10,
        "position": { "x": 0, "y": 0 },
        "isLocked": false
    });

    function isValidColor(color: string): boolean {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#000';
        ctx.fillStyle = color;
        return ctx.fillStyle !== '#000000';
    }

  return (
    <div>
        <h1 className="text-lg text-center">Asztal hozzáadása</h1>
        <div className="flex flex-col p-2">
            <span className="text-gray-400">Típus</span>
            <input className="pl-2" type="text" value={fresh.type} onChange={(e) => { 
                const next = (e.target as HTMLInputElement).value;
                setFresh(prev => ({...prev, type: next }));
                }}/>
        </div>
        <div className="flex flex-col p-2">
            <span className="text-gray-400">Kategória</span>
            <input className="pl-2" type="text" value={fresh.category} onChange={(e) => { 
                const next = (e.target as HTMLInputElement).value;
                setFresh(prev => ({...prev, category: next }));
                }}/>
        </div>
        <div className="flex flex-col p-2">
            <span className="text-gray-400">Szín</span>
            <input className="pl-2" type="text" value={fresh.color} onChange={(e) => { 
                const next = (e.target as HTMLInputElement).value;
                setFresh(prev => ({...prev, color: next }));
                }}/>
        </div>
        <div className="flex flex-col p-2">
            <div className="flex">
                <span className="text-gray-400">Állapot</span>
                <span className="ml-auto">{fresh.status} / 10</span>
            </div>
            <input type="range" min={0} max={10} value={fresh.status} onChange={(e) => { 
                const next = Number((e.target as HTMLInputElement).value);
                setFresh(prev => ({...prev, status: next }));
                }}/>
        </div>
        <Button className='mt-6 w-full bg-gray-950 text-white' onClick={() => {
            if (!['snooker', 'foosball', 'air-hockey'].includes(fresh.type)) {
                return;
            }
            if (!['competition', 'normal', 'kids'].includes(fresh.category)) {
                return;
            }
            if (!isValidColor(fresh.color)) {
                return;
            }
            if (!(0 <= fresh.status && fresh.status <= 10)) {
                return;
            }
            setLastAction('hozzáadás');
            try {
                addTable(fresh);
                startEditing(fresh);
                setStatus('success');
            } catch {
                setStatus('error');
            }
        }}>
            Hozzáadás
        </Button>
    </div>
  )
}

export default AddTable