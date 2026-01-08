import {
  Avatar,
  Box,
  Container,
  css,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { ReactNode, useEffect } from 'react';
import { useCurrentUserLazyQuery } from '../../../generated/graphql';
import theme from '../../../styles/theme';

export function Layout({ children }: { children: ReactNode }) {
  const [fetchUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Box css={styles.main} sx={{ padding: { xs: '0', md: '16px 15%' } }}>
      <Box css={styles.navBar}>
        <Grid2 container spacing={2} css={styles.grid}>
          <Grid2
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
          <Grid2 css={styles.logo}>
            <TextField css={styles.search} placeholder="Search..." />
          </Grid2>
          <Grid2 size="grow" css={styles.logo}>
            <Avatar title={data?.currentUser?.name} css={styles.avatar}>
              {data?.currentUser?.name[0]}
            </Avatar>
          </Grid2>
        </Grid2>
      </Box>
      <Paper elevation={1} css={styles.content}>
        {children}
      </Paper>
    </Box>
  );
}

const styles = {
  main: css({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  }),
  navBar: css({
    width: '100%',
    height: 'max-content',
    padding: '16px 8px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '16px 16px 0px 0px',
    backgroundColor: '#131418',
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.25)',
  }),
  grid: css({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  logo: css({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0px 16px',
  }),
  search: css({
    width: '400px',
    height: '100%',
  }),
  avatar: css({
    backgroundColor: theme.palette.primary.dark,
  }),
  content: css({
    width: '100%',
    minHeight: '85dvh',
    padding: '16px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }),
};
