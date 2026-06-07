import React, { useState } from 'react'
import { Button } from './ui/button'
import { useGetMeQuery, useGetTableSlotsQuery, usePostBookingMutation } from '@/store/roomlieApi'
import { useEdit } from '@/context/EditContext'

const ReservePanel = () => {
    const {data: user} = useGetMeQuery();
    const {selected} = useEdit();
    const [name, setName] = useState(user?.name ?? '')
    const [email, setEmail] = useState(user?.email ?? '')
    const [phone, setPhone] = useState('')
    const [headcount, setHeadCount] = useState(2)
    const [notes, setNotes] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [status, setStatus] = useState<'success' | 'error' | null>(null)
    const {data: slots} = useGetTableSlotsQuery({id: selected?.id ?? 0, date}, {skip: !selected});
    const [postBooking] = usePostBookingMutation()

    if (!selected) {
        return null;
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const slot = slots?.find(x => x.startTime == time);
        if (!slot?.isAvailable) {
            setStatus('error');
            return;
        }

        try {
            await postBooking({tableId: selected!.id, date, startTime: slot.startTime, endTime: slot.endTime, name, email, phone, headcount, notes});
        } catch (err) {
            setStatus('success');
        }

        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setHeadCount(0);
        setNotes('');
        setTime('');
        setDate(new Date().toISOString().split('T')[0]);
    }

  return (
    <div className="ml-auto z-10 w-sm shrink-0 border-2 border-gray-500 rounded sticky top-0">
        {status === 'success' && <p className="text-green-500">Sikeres foglalás!</p>}
        {status === 'error' && <p className="text-red-500">Sikertelen foglalás!</p>}
      <h1 className="text-2xl font-bold mb-6">Asztalfoglalás</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Válassz napot</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Elérhető időpontok</label>
          <div className='grid grid-cols-3 gap-2'>
            {slots?.map((slot, index) => 
              <button
                key={index}
                className={`text-center rounded-2xl ${time == slot.startTime ? 'bg-black text-white' : ''} ${slot.isAvailable ? '' : 'line-through'}`}
                onClick={() => setTime(slot.startTime)}
                disabled={!slot.isAvailable}
                >
                    {slot.startTime}-{slot.endTime}
            </button>
            )}
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Név</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="janedoe@example.com"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Résztvevők</label>
          <input
            type="number"
            value={headcount}
            onChange={(e) => (!isNaN(e.target.valueAsNumber) || e.target.value == '') && setHeadCount(e.target.valueAsNumber)}
            placeholder="2"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Telefonszám</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+36 20 123 4567"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Megjegyzés</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Opcionális..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
        </div>
        {/* {error && <p className="text-sm text-destructive">Hibás email vagy jelszó.</p>} */}
        <Button type="submit" className="w-full">
          {/*isLoading ? 'Regisztrálás...' : 'Regisztrálás'*/}
          Asztal lefoglalása
        </Button>
      </form>
    </div>
  )
}

export default ReservePanel