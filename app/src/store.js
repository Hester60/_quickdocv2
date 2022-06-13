import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './reducers/projectsSlice';

export default configureStore({
    reducer: {
        'projects': projectsSlice
    }
})