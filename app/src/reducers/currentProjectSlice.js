import { createSlice } from "@reduxjs/toolkit";

const fromLocalStorage = localStorage.getItem('currentProject');

if (fromLocalStorage === 'undefined') {
    localStorage.removeItem('currentProject');
}

const initialState = {
    item: fromLocalStorage ? JSON.parse(fromLocalStorage) : null
}

const currentProjectSlice = createSlice({
    name: 'currentProject',
    initialState,
    reducers: {
        selectCurrentProject(state, action) {
            state.item = action.payload
            localStorage.setItem('currentProject', JSON.stringify(action.payload));
        }
    }
});

export const { selectCurrentProject } = currentProjectSlice.actions

export default currentProjectSlice.reducer;
