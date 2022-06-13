import MainDrawer from "./components/Navigation/MainDrawer";
import { useEffect } from 'react';
import { fetchProjects } from './reducers/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const projectsLoading = useSelector(state => state.projects.loading);

  useEffect(() => {
    if (!projectsLoading) {
        dispatch(fetchProjects());
    }
}, [dispatch]);


  return (
    <MainDrawer />
  );
}

export default App;
