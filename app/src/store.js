import { configureStore } from '@reduxjs/toolkit';
import projectsSlice from './reducers/projectsSlice';
import currentProjectSlice from "./reducers/currentProjectSlice";
import pagesSlice from "./reducers/pagesSlice";
import drawerWidthSlice from './reducers/drawerWidthSlice';
import notificationsSlice from './reducers/notificationsSlice';
import httpErrorSlice from './reducers/httpErrorSlice';

export default configureStore({
    reducer: {
        'projects': projectsSlice,
        'currentProject': currentProjectSlice,
        'pages': pagesSlice,
        'drawerWidth': drawerWidthSlice,
        'notifications':notificationsSlice,
        'httpError': httpErrorSlice
    }
})
