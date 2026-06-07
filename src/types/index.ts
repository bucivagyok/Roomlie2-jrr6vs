export type { TableData, TableEditForm } from './table';
export type { ListResponse, ApiTag } from './api';
export type { AuthUser, AuthState } from './auth';
export type { Booking, TimeSlot, BookingForm } from './bookings';

export interface Size {
    x: number;
    y: number;
}

export const tableSizes: Record<string, {x: number, y:number}> = {
    "snooker": {x: 190, y: 100},
    "air-hockey": {x: 140, y: 70},
    "foosball": {x: 120, y: 60}
}

export const tableBoundaries: Record<string, number> = {
    "snooker": 50,
    "air-hockey": 40,
    "foosball": 30
}

export const localization: Record<string, string> = {
    "snooker": "Biliárd",
    "air-hockey": "Léghoki",
    "foosball": "Csocsó",
    "competition": "Verseny",
    "normal": "Normál",
    "kids": "Gyerek",
    "red": "Piros",
    "green": "Zöld",
    "blue": "Kék",
}