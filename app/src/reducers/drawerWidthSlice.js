import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    width: 300
}

const drawerWidthSlice = createSlice({
    name: 'drawerWidth',
    initialState,
    reducers: {
        modifyWidth(state, action) {
            state.width = action.payload
        }
    }
});

export const { modifyWidth } = drawerWidthSlice.actions

export default drawerWidthSlice.reducer;
