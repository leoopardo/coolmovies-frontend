import type { NextPage } from 'next';
import { ViewListMovies } from '../features/listMovies/view';
import { useSearchParams } from 'next/navigation';
import { ViewListMovieRevies } from '../features/listMoviesReviews/view';

const Home: NextPage = () => {
  const searchParams = useSearchParams();

  return (
    <>
      <ViewListMovies />
    </>
  );
};

export default Home;
