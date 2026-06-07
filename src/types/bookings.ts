export interface TimeSlot {
    startTime: string,
    endTime: string,
    isAvailable: boolean
}

export interface BookingForm {
    tableId: number, 
    date: string, 
    startTime: string, 
    endTime: string, 
    name: string, 
    email: string, 
    phone: string, 
    headcount: number, 
    notes: string
}

export interface Booking {
    id: number,
    tableId: number,
    tableName: string,
    userId: number,
    date: string,
    startTime: string,
    endTime: string,
    name: string,
    email: string,
    phone: string,
    headcount: number,
    notes: string,
    status: string
}