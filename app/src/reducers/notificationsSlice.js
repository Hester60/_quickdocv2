import { createSlice} from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

export const NOTIFICATION_SUCCESS_TYPE = 'success';

const initialState = {
    items: []
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        pushNotification(state, action) {
            const notification = {
                text: action.payload.text,
                id: uuid(),
                type: action.payload.type
            }
            state.items = [...state.items, notification];
        },
        removeNotification(state, action) {
            const notifications = [...state.items];
            const index = notifications.findIndex(e => e.id === action.payload);
            if (index >= 0) {
                notifications.splice(index, 1);
            }
            state.items = notifications;
        }
    }
})

export const {pushNotification, removeNotification} = notificationsSlice.actions;

export default notificationsSlice.reducer;
