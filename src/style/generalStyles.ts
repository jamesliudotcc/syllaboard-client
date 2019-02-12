import { Theme } from '@material-ui/core';

export const label = (theme: Theme) => ({
  color: theme.palette.primary.main,
});

export const inlineForm = (theme: Theme) => ({
  margin: '0 auto',
  [theme.breakpoints.down('xs')]: {
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '40%',
  },
});
