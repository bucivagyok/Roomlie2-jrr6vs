import { useEdit } from "@/context/EditContext";
import type { TableData } from "@/types"
import { Button } from './ui/button';

interface EditorProps {
    setStatus: React.Dispatch<React.SetStateAction<"success" | "error" | null>>;
    setLastAction: React.Dispatch<React.SetStateAction<"hozzáadás" | "módosítás" | null>>
}

const Editor = ({setStatus, setLastAction}: EditorProps) => {
    const {editing, setEditing, updateTable, saveEdit} = useEdit();

    //Az Editorban `editing` és `setEditing` mindig definiálva van
    const editingD = editing as TableData;
    const setEditingD = setEditing as React.Dispatch<React.SetStateAction<TableData>>;

    function isValidColor(color: string): boolean {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#000';
        ctx.fillStyle = color;
        return ctx.fillStyle !== '#000000';
    }

    async function save() {
        if (!['snooker', 'foosball', 'air-hockey'].includes(editingD.type)) {
            return;
        }
        if (!['competition', 'normal', 'kids'].includes(editingD.category)) {
            return;
        }
        if (!isValidColor(editingD.color)) {
            return;
        }
        if (!(0 <= editingD.status && editingD.status <= 10)) {
            return;
        }
        try {
            setLastAction('módosítás')
            await saveEdit();
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

  return (
    <div>
        <h1 className="text-lg text-center">Asztal adatainak módosítása</h1>
        <div className="flex flex-col p-2">
            <span className="text-gray-400">Típus</span>
            <input className="pl-2" type="text" value={editingD.type} onChange={(e) => { 
                const next = (e.target as HTMLInputElement).value;
                setEditingD(prev => ({...prev, type: next }));
                if (['snooker', 'foosball', 'air-hockey'].includes(next)) {
                    updateTable(editingD.id, {...editingD, type: next})
                }
                }}/>
        </div>
        <div className="flex flex-col p-2">
            <span className="text-gray-400">Kategória</span>
            <input className="pl-2" type="text" value={editingD.category} onChange={(e) => { 
                const next = (e.target as HTMLInputElement).value;
                setEditingD(prev => ({...prev, category: next }));
                if (['competition', 'normal', 'kids'].includes(next)) {
                    updateTable(editingD.id, {...editingD, category: next})
                }
                }}/>
        </div>
        <div className="flex flex-col p-2">
            <span className="text-gray-400">Szín</span>
            <input className="pl-2" type="text" value={editingD.color} onChange={(e) => { 
                const next = (e.target as HTMLInputElement).value;
                setEditingD(prev => ({...prev, color: next }));
                if (isValidColor(next)) {
                    updateTable(editingD.id, {...editingD, color: next})
                }
                }}/>
        </div>
        <div className="flex flex-col p-2">
            <div className="flex">
                <span className="text-gray-400">Állapot</span>
                <span className="ml-auto">{editingD.status} / 10</span>
            </div>
            <input type="range" min={0} max={10} value={editingD.status} onChange={(e) => { 
                const next = Number((e.target as HTMLInputElement).value);
                setEditingD(prev => ({...prev, status: next }));
                if (0 <= next && next <= 10) {
                    updateTable(editingD.id, {...editingD, status: next})
                }
                }}/>
        </div>
        <Button className='mt-6 w-full bg-gray-950 text-white' onClick={save}>
            Módosítások mentése
        </Button>
    </div>
  )
}

export default Editor