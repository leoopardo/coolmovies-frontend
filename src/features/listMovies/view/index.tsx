import { css } from '@emotion/react';
import { Grid2, Typography } from '@mui/material';
import { memo } from 'react';
import { useListMovies } from '../hooks/useListMovies';

export const ViewListMovies = memo(() => {
  const { data } = useListMovies();

  return (
    <Grid2 container sx={{ width: '100dvw', display: 'flex', justifyContent: "center" }}>
      {data?.map((movie) => (
        <Grid2
          key={movie.id}
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(18, 18, 18, 1)), url(${movie.imgUrl})`,
            height: {
              xs: '50dvh',
              md: '65dvh',
            },
          }}
          css={styles.posters}
          size={{
            xs: 12,
            sm: 6,
            md: 3,
          }}
        >
          <Typography variant="h5" textAlign="center">
            {movie.title}
          </Typography>
        </Grid2>
      ))}
    </Grid2>
  );
});

const styles = {
  posters: css({
    height: '65dvh',
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    display: 'flex',
    alignItems: 'flex-end',
    padding: '31px 32px',

    transition: 'background-size 0.5s ease',

    '&:hover': {
      backgroundSize: '110%',
      cursor: 'pointer',
    },
  }),
};
