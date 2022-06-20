import {createSlice} from '@reduxjs/toolkit';

const fromLocalStorage = localStorage.getItem('token');

if (fromLocalStorage === 'undefined') {
    localStorage.removeItem('token');
}

const initialState = {
    token: fromLocalStorage ?? null 
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.auth = action.payload;
        },
        logout(state, action) {
            state.auth = null;
            localStorage.removeItem('token');
        }
    }
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;