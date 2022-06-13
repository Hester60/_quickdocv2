import MainDrawer from "./components/Navigation/MainDrawer";
import {useEffect} from 'react';
import {fetchProjects} from './reducers/projectsSlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectCurrentProject} from "./reducers/currentProjectSlice";

function App() {
    const dispatch = useDispatch();
    const projectsLoading = useSelector(state => state.projects.loading);
    const currentProject = useSelector(state => state.currentProject.item);

    useEffect(() => {
        if (!projectsLoading) {
            (async () => {
                const projects = await dispatch(fetchProjects()).unwrap();

                if (projects.length > 0 && !currentProject) {
                    dispatch(selectCurrentProject(projects[0]));
                }

            })();

        }
    }, [dispatch]);


    return (
        <MainDrawer/>
    );
}

export default App;
