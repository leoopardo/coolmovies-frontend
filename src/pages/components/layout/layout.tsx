import { Avatar, css, Grid2, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { useCurrentUserLazyQuery,  } from '../../../generated/graphql';
import theme from '../../../styles/theme';

export function Layout({ children }: { children: ReactNode }) {
  const [fetchUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <Paper elevation={3} css={styles.navBar}>
        <Grid2 container spacing={2} css={styles.grid}>
          <Grid2
            size={{
              xs: 10,
              md: 7,
            }}
            css={styles.logo}
            sx={{
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            <Stack
              gap={2}
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Image src={'/favicon.ico'} alt="ico" width={50} height={50} />
              <Typography variant="h3">{'EcoPortal'}</Typography>
            </Stack>
          </Grid2>
          <Grid2
            size={{
              xs: 2,
              md: 5,
            }}
            css={styles.logo}
          >
            <Avatar title={data?.currentUser?.name} css={styles.avatar} >{data?.currentUser?.name[0]}</Avatar>
          </Grid2>
        </Grid2>
      </Paper>
      {children}
    </main>
  );
}

const styles = {
  navBar: css({
    width: '100dvw',
    height: 'max-content',
    padding: '16px 8px',
    display: 'flex',
    alignItems: 'center',
  }),
  grid: css({
    width: '100%',
  }),
  logo: css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0px 16px',
  }),
  avatar: css({
    backgroundColor: theme.palette.primary.dark,
  })
};
