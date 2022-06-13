import MainDrawer from "./components/Navigation/MainDrawer";
import {useEffect} from 'react';
import {fetchProjects} from './reducers/projectsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentProject} from "./reducers/currentProjectSlice";
import {fetchPages} from "./reducers/pagesSlice";

function App() {
    const dispatch = useDispatch();
    const projectsLoading = useSelector(state => state.projects.loading);
    const currentProject = useSelector(state => state.currentProject.item);

    useEffect(() => {
        if (!projectsLoading) {
            (async () => {
                const projects = await dispatch(fetchProjects()).unwrap();
                const selectedProject = currentProject ?? projects[0];
                if (projects.length > 0 ) {
                    dispatch(selectCurrentProject(selectedProject));
                    const query = `?project=${selectedProject._id}&projection=_id,title`;
                    dispatch(fetchPages(query));
                } else {
                    // Redirect to create new project page
                }
            })();
        }
    }, [dispatch]);


    return (
        <MainDrawer/>
    );
}

export default App;
