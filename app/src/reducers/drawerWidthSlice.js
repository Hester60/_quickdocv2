import { createSlice } from "@reduxjs/toolkit";

export const minDrawerWidth = 300;

const initialState = {
    width: minDrawerWidth
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
