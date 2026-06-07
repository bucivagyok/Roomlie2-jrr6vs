import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type ApiTag, type TableData, type AuthUser, type Booking, type TimeSlot, type BookingForm, type TableEditForm } from '../types';

export const roomlieApi = createApi({
    reducerPath: 'roomlieApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            headers.set('X-Neptun-Code', import.meta.env.VITE_NEPTUN_CODE)
            return headers
        }
    }),
    tagTypes: ['Users', 'Tables'] as ApiTag[],
    endpoints: (builder) => ({
        login: builder.mutation<{ token: string; user: AuthUser}, { email: string; password: string}>({
            query: (body) => ({ url: `/auth/login`, method: 'POST', body}),
            invalidatesTags: ['Auth'],
        }),

        logoutUser: builder.mutation<void, void>({
            query: () => ({ url: `/auth/logout`, method: 'POST'}),
            invalidatesTags: ['Auth']
        }),

        register: builder.mutation<void, {name: string; email: string; password: string}>({
            query: (body) => ({ url: `/auth/register`, method: 'POST', body}),
            invalidatesTags: ['Auth']
        }),

        getMe: builder.query<AuthUser, void>({
            query: () => `/auth/me`,
            providesTags: ['Auth'],
        }),

        getTables: builder.query<TableData[], void>({
            query: () => `/tables`,
            providesTags: ['Tables']
        }),

        getTableSlots: builder.query<TimeSlot[], {id: number, date: string}>({
            query: ({id, date}) => ({
                url: `/tables/${id}/timeslots`, 
                params: {date}
            }),
            providesTags: ['Bookings']
        }),

        postBooking: builder.mutation<void, BookingForm>({
            query: (body) => ({ url: `/bookings`, method: 'POST', body}),
            invalidatesTags: ['Bookings']
        }),
        
        getMyBookings: builder.query<Booking[], void>({
            query: () => `/bookings/my`,
            providesTags: ['Bookings']
        }),

        getBookings: builder.query<Booking[], void>({
            query: () => `/bookings`,
            providesTags: ['Bookings']
        }),

        addTable: builder.mutation<void, TableData>({
            query: (body) => ({ url: `/tables`, method: 'POST', body}),
            invalidatesTags: ['Tables']
        }),

        moveTable: builder.mutation<void, {id: number, pos: {x: number, y: number}}>({
            query: ({id, pos}) => ({ url: `/tables/${id}/position`, method: 'PATCH', body: pos}),
            invalidatesTags: ['Tables']
        }),

        editTable: builder.mutation<void, {id: number, form: TableEditForm}>({
            query: ({id, form}) => ({ url: `/tables/${id}`, method: 'PATCH', body: form}),
            invalidatesTags: ['Tables']
        }),

        acceptBooking: builder.mutation<void, {id: number, status: string}>({
            query: ({id, status}) => ({ url: `/bookings/${id}/status`, method: 'PATCH', body: {status}}),
            invalidatesTags: ['Bookings']
        })
    })
})

export const { 
    useGetTablesQuery, 
    useGetMeQuery, 
    useLoginMutation, 
    useLogoutUserMutation, 
    useRegisterMutation, 
    useGetTableSlotsQuery, 
    usePostBookingMutation, 
    useGetMyBookingsQuery,
    useGetBookingsQuery,
    useAddTableMutation,
    useMoveTableMutation,
    useEditTableMutation,
    useAcceptBookingMutation
} = roomlieApi;