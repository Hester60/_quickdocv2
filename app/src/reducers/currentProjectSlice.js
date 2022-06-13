import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: null
}

const currentProjectSlice = createSlice({
    name: 'currentProject',
    initialState,
    reducers: {
        selectCurrentProject(state, action) {
            state.item = action.payload
        }
    }
});

export const { selectCurrentProject } = currentProjectSlice.actions

export default currentProjectSlice.reducer;
