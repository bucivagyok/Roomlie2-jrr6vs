import { useEdit } from '@/context/EditContext'


const Summary = () => {
  const { tables } = useEdit();
  return (
    <div>
        <span className="m-2">{tables.length} asztal összesen </span>
        <span className="m-2">Csocsó: {tables.filter(x => x.type == 'foosball').length}db {(tables.filter(x => x.type == 'foosball').reduce((acc, curr) => acc + curr.status, 0.0)/tables.filter(x => x.type == 'foosball').length).toFixed(1)}</span>
        <span className="m-2">Biliárd: {tables.filter(x => x.type == 'snooker').length}db {(tables.filter(x => x.type == 'snooker').reduce((acc, curr) => acc + curr.status, 0.0)/tables.filter(x => x.type == 'snooker').length).toFixed(1)} </span>
        <span className="m-2">Léghoki: {tables.filter(x => x.type == 'air-hockey').length}db {(tables.filter(x => x.type == 'air-hockey').reduce((acc, curr) => acc + curr.status, 0.0)/tables.filter(x => x.type == 'air-hockey').length).toFixed(1)} </span>
    </div>
  )
}

export default Summary