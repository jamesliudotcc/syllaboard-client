import React from 'react';

// Material UI imports
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      margin: '50px auto',
      textAlign: 'center',
    },
  });

type Props = WithStyles<typeof styles>;

const Welcome = (props: Props) => {
  return (
    <div>
      <Typography variant="h1" className={props.classes.title}>
        Welcome to Syllaboard!
      </Typography>
    </div>
  );
};

export default withStyles(styles)(Welcome);
