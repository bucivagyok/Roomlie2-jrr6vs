import type { TableData } from "@/types"
import { createContext, useContext, useState, type ReactNode} from "react"
import { useAddTableMutation, useEditTableMutation, useGetTablesQuery, useMoveTableMutation } from "@/store/roomlieApi";

interface EditContextType {
    tables: TableData[];
    selected: TableData | undefined;
    editing: TableData | undefined;
    updateSelected: (id: number) => void;
    removeTable: (id: number) => void;
    updateTable: (id: number, data: TableData) => void;
    startEditing: (data: TableData) => void;
    setEditing: React.Dispatch<React.SetStateAction<TableData | undefined>>;
    addTable: (fresh: TableData) => void;
    endMoving: (id: number, position: {x: number, y: number}) => void;
    saveEdit: () => void;
}

const EditContext = createContext<EditContextType | null>(null)

export function EditProvider({children}: {children: ReactNode}) {
    const {data: tablesData} = useGetTablesQuery();
    const tables = tablesData?? [];
    const [addTableDB] = useAddTableMutation();
    const [moveTable] = useMoveTableMutation();
    const [editTable] = useEditTableMutation();

    //const [tables, setTables] = useState<TableData[]>(initTables);
    const [selected, setSelected] = useState<TableData>();
    const [editing, setEditing] = useState<TableData>();

    function updateSelected(id: number): void {
        setEditing(undefined);
        setSelected(prev => prev?.id == id ? undefined : tables.find(x => x.id == id))
    }

    function removeTable(_id: number) {
        //setTables(prev => { return prev.filter(x => x.id != id) });
        setSelected(undefined);
    }

    function updateTable(_id:number, _data:TableData) {
        //setTables(prev => {return prev.map(x => x.id != id ? x : {...data, id:id})})
    }

    function startEditing(data: TableData) {
        setEditing(data);
    }

    async function addTable(fresh: TableData) {
        await addTableDB(fresh).unwrap();
    }

    async function endMoving(id: number, position: {x: number, y: number}) {
        await moveTable({id: id, pos: position})
    }

    async function saveEdit() {
        if (editing === undefined) return;
        const current = editing!;
        await editTable({id: current.id, form: {type: current.type, category: current.category, color: current.color, status: current.status, isLocked: current.isLocked}}).unwrap()
    }

    return (
        <EditContext.Provider value={{ tables, selected, editing, updateSelected, removeTable, updateTable, startEditing, setEditing, addTable, endMoving, saveEdit}}>
            {children}
        </EditContext.Provider>
    )
}

export function useEdit(): EditContextType {
    const context = useContext(EditContext)

    if (!context) {
        throw new Error("useEdit csak EditProvideren belül használható")
    }

    return context;
}