import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from '../api';

const initialState = {
    loading: false,
    items: [],
    error: null
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers(build) {
        build
            .addCase(fetchProjects.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
});

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
    const response = await api.get(`projects`);
    return response.data;
});

export const selectAllProjects = state => state.projects.items;
export default projectsSlice.reducer;
