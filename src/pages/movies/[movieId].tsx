import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Movie: NextPage = () => {
  const router = useRouter();
  const { movieId } = router.query;

  return (
    <>
      <p>Movie ID: {movieId}</p>
    </>
  );
};

export default Movie;
