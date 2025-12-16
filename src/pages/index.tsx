import type { NextPage } from 'next';
import { useListMovies } from '../features/listMovies/hooks/useListMovies';
import { ViewListMovies } from '../features/listMovies/view';

const Home: NextPage = () => {

  return <ViewListMovies/>;
};

export default Home;
