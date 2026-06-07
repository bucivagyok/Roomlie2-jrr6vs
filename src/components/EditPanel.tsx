import Details from "./Details"
import Editor from "./Editor"
import { useEdit } from "@/context/EditContext";
import AddTable from "./AddTable";
import { useState } from "react";


const EditPanel = () => {
    const {editing, selected } = useEdit();
    const [status, setStatus] = useState<'success' | 'error' | null>(null)
    const [lastAction, setLastAction] = useState<'hozzáadás' | 'módosítás' | null>(null)

  return (
    <div className="ml-auto z-10 w-sm shrink-0 border-2 border-gray-500 rounded sticky top-0">
      {status === 'success' && <p className="text-green-500">Sikeres {lastAction}!</p>}
      {status === 'error' && <p className="text-red-500">Sikertelen {lastAction}!</p>}

      {editing != undefined ? <Editor setStatus={setStatus} setLastAction={setLastAction}/> : 
        selected != undefined ? <Details/> : 
        <AddTable setStatus={setStatus} setLastAction={setLastAction}/>}
    </div>
  )
}

export default EditPanel