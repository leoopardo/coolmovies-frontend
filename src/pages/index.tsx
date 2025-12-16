'use client';

import type { NextPage } from 'next';
import { useListMoviesReviews } from '../hooks/useListMoviesReviews';

const Home: NextPage = () => {
  const { data, setQuery, query } = useListMoviesReviews();

  return <>{JSON.stringify(data)}</>;
};

export default Home;
