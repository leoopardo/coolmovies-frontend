import { css, keyframes } from '@emotion/react';
import {
  Box,
  Grid,
  Grid2,
  LinearProgress,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
import { useListMovies } from '../hooks/useListMovies';
import { useListMoviesReviews } from '../../listMoviesReviews/hooks/useListMoviesReviews';
import { Stars } from '../components/Starts';
import theme from '../../../styles/theme';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ViewListMovieRevies } from '../../listMoviesReviews/view';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ViewListMovies = memo(() => {
  const { data, total } = useListMovies();
  const { data: reviews } = useListMoviesReviews();
  const [value, setValue] = useState(0);
  const { push, replace } = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const currentMovie = searchParams.get('movie');

  // Refs para todos os cards
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!currentMovie) return;

    const element = cardRefs.current[currentMovie];
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const y = rect.top + window.scrollY - 25;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }, [currentMovie]);

  return (
    <Box id="drawer-container" css={styles.container}>
      <Box
        sx={{
          marginBottom: 6,
          display: 'flex',
          padding: { xs: '8px', md: '0 64px' },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Todos" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Grid2 container spacing={4}>
        {data?.map((movie) => {
          const movieReviews = reviews?.filter(
            (review) => review.movieId === String(movie.id)
          );
          const movieReviewsTotal =
            (movieReviews?.reduce((acc, curr) => {
              return acc + (curr?.rating || 0);
            }, 0) || 0) / (movieReviews?.length || 0);

          return (
            <Grid2
              key={movie.id}
              ref={(el: HTMLDivElement) => {
                cardRefs.current[movie.id as any] = el;
              }}
              sx={{
                backgroundImage: `linear-gradient(rgba(18, 18, 18, 1), rgba(18, 18, 18, 0.3)), url(${movie.imgUrl})`,
                animation:
                  currentMovie === movie.id
                    ? `${borderAnimation} 0.5s forwards ease`
                    : undefined,
              }}
              onClick={() => {
                if (movie.id == currentMovie) {
                  replace(`${path}`);
                  return;
                }
                push(`?movie=${movie.id}`);
              }}
              css={styles.posters}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                xl: 3,
              }}
            >
              <Typography variant="h6">{movie.title}</Typography>
              <Box>
                <Stars value={movieReviewsTotal} size={22} />
              </Box>
            </Grid2>
          );
        })}
      </Grid2>
      {currentMovie && (
        <Box css={styles.modal} key={currentMovie}>
          <ViewListMovieRevies />
        </Box>
      )}
    </Box>
  );
});

const borderAnimation = keyframes`
  0% {
    outline: none;
    box-shadow: none;
  }
  50% {
    outline:  2px solid ${theme.palette.primary.main};
  }
  100% {
    outline:  2px solid ${theme.palette.primary.main};
    box-shadow: 0px 0px 16px ${theme.palette.primary.light};
  }
`;
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const styles = {
  container: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  posters: css({
    height: 350,
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '31px 32px',
    gap: 16,
    borderRadius: '24px',
    transition: 'background-size 0.5s ease',

    '&:hover': {
      backgroundSize: '110%',
      cursor: 'pointer',
    },
  }),
  modal: css({
    bottom: '0',
    width: '100%',
    minHeight: '40dvh',
    marginTop: 32,
    borderRadius: '24px',
    padding: '32px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.3)',
    animation: `${slideUp} 0.4s ease`,
  }),
};
