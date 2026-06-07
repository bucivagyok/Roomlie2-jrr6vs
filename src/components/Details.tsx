import { localization, type TableData } from '@/types'
import { Button } from './ui/button';
import { useEdit } from '@/context/EditContext';

const Details = () => {
    const {selected, removeTable, startEditing} = useEdit();
    const selectedD = selected as TableData;
  return (
    <div>
        <h1 className="text-lg text-center">Asztal adatai</h1>

        <div className="flex p-2">
            <span className="text-gray-400">Típus</span>
            <span className="ml-auto">{localization[selectedD.type]}</span>
        </div>
        <div className="flex p-2">
            <span className="text-gray-400">Kategória</span>
            <span className="ml-auto">{localization[selectedD.category]}</span>
        </div>
        <div className="flex p-2">
            <span className="text-gray-400">Szín</span>
            <span className="ml-auto">{localization[selectedD.color]}</span>
        </div>
        <div className="flex p-2">
            <span className="text-gray-400">Pozíció</span>
            <span className="ml-auto">{selectedD.position.x + ", " + selectedD.position.y}</span>
        </div>
        <div className="flex flex-col p-2">
            <div className="flex">
                <span className="text-gray-400">Állapot</span>
                <span className="ml-auto">{selectedD.status} / 10</span>
            </div>
            <input type="range" min={0} max={10} value={selectedD.status} readOnly/>
        </div>
        <Button className='w-full bg-gray-200 text-black-600' onClick={() => {startEditing(selectedD)}}>
            Asztal adatainak szerkesztése
        </Button>
        <Button className='mt-6 w-full bg-red-200 text-red-600' onClick={() => removeTable(selectedD.id)}>
            Asztal törlése
        </Button>
    </div>
    
  )
}

export default Details