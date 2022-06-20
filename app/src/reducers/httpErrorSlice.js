import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    error: null
}

const httpErrorSlice = createSlice({
    name: 'httpError',
    initialState,
    reducers: {
        addHttpError(state, action) {
            state.error = action.payload;
        },
        clearHttpError(state, action) {
            state.error = null;
        }
    }
});

export const {addHttpError, clearHttpError} = httpErrorSlice.actions;

export default httpErrorSlice.reducer;
