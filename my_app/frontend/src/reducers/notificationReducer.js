import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: '', type: '' }

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return (state = action.payload)
        },
        clearNotification(state) {
            return (state = initialState)
        },
    },
})

export const sendNotification = (message, type) => {
    return async (dispatch) => {
        dispatch(setNotification({ message, type }))
    }
}

export const resetNotification = () => {
    return async (dispatch) => {
        dispatch(clearNotification())
    }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
