import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './reducers/projectsSlice';
import currentProjectSlice from "./reducers/currentProjectSlice";

export default configureStore({
    reducer: {
        'projects': projectsSlice,
        'currentProject': currentProjectSlice
    }
})
