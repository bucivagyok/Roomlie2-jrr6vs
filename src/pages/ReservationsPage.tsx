import { useAcceptBookingMutation, useGetBookingsQuery, useGetMeQuery, useGetMyBookingsQuery } from '@/store/roomlieApi'
import { useState } from 'react'
import { Button } from '../components/ui/button'

const ReservationsPage = () => {
    const [selected, setSelected] = useState<number[]>([])
    const [acceptBooking] = useAcceptBookingMutation()

    function toggleSelected(id: number) {
        setSelected(prev => 
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    const {data: user} = useGetMeQuery()
    const {data: reservations, } = user?.role === 'admin' ? useGetBookingsQuery() : useGetMyBookingsQuery()
  return (
    <div className="flex justify-center">
        <div className='w-1/3 flex flex-col gap-4'>
        {reservations?.map((reservation, key) => 
            <div className='border rounded border-gray-300' key={key}>
                <div className='flex justify-between items-center p-4 cursor-pointer'
                onClick={() => {toggleSelected(key)}}>
                    <h2>{reservation.tableName}</h2>
                    <span>{reservation.status}</span>
                </div>
                {selected.includes(key) &&
                <div>
                    <div className='flex justify-between items-center p-4'>
                        <div>Foglaló neve:</div>
                        <span>{reservation.name}</span>
                    </div>
                    <div className='flex justify-between items-center p-4'>
                        <div>Email:</div>
                        <span>{reservation.email}</span>
                    </div>
                    <div className='flex justify-between items-center p-4'>
                        <div>Telefon:</div>
                        <span>{reservation.phone}</span>
                    </div>
                    {reservation.notes !== undefined &&
                    <div className='flex justify-between items-center p-4'>
                        <div>Megjegyzések:</div>
                        <span>{reservation.notes}</span>
                    </div>}
                    {user?.role === 'admin' && reservation.status == 'pending' &&
                    <div className='flex justify-between items-center p-4'>
                        <Button className='flex-1 bg-gray-900 hover:bg-gray-700' onClick={() => acceptBooking({id: reservation.id, status: 'accepted'})}>Elfogad</Button>
                        <Button className='flex-1 bg-red-500 hover:bg-red-400' onClick={() => acceptBooking({id: reservation.id, status: 'declined'})}>Elutasít</Button>
                    </div>
                    }
                </div>}
            </div>
        )}
        </div>
    </div>
  )
}

export default ReservationsPage