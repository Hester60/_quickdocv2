import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './reducers/projectsSlice';
import currentProjectSlice from "./reducers/currentProjectSlice";
import pagesSlice from "./reducers/pagesSlice";

export default configureStore({
    reducer: {
        'projects': projectsSlice,
        'currentProject': currentProjectSlice,
        'pages': pagesSlice,
    }
})
