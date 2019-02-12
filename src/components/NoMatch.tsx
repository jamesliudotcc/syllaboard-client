import React from 'react';

// Material UI imports
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    center: {
      textAlign: 'center',
    },
    title: {
      margin: '50px auto',
      textAlign: 'center',
    },
  });

type Props = WithStyles<typeof styles>;

const NoMatch = (props: Props) => {
  return (
    <div className={props.classes.center}>
      <Typography variant="h3" className={props.classes.title}>
        Page Not Found
      </Typography>
      <br/>
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default withStyles(styles)(NoMatch);