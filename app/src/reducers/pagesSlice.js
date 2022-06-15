import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from '../api';

const initialState = {
    loading: false,
    items: [],
    pagination: {},
    error: null
}

const pagesSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        addPage(state, action) {
            const page = action.payload;
            console.log(page);
            state.items = state.items.concat(page);
            console.log(state.items);
        }
    },
    extraReducers(build) {
        build
            .addCase(fetchPages.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchPages.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.pages;
                state.pagination = action.payload.pagination;
            })
            .addCase(fetchPages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
});

export const fetchPages = createAsyncThunk('pages/fetchPages', async (query= '' ) => {
    const response = await api.get(`pages${query}`);
    return response.data;
});

export const {addPage} = pagesSlice.actions;
export const selectAllPage = state => state.pages.items;
export default pagesSlice.reducer;
