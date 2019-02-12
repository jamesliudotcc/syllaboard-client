import * as React from 'react';

// Material UI components
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Types
import { Cohort } from '../../../Types';

import ShowAllCohorts from './ShowAllCohorts';

const styles = (theme: Theme) =>
  createStyles({
    divider: {
      marginBottom: '1.25em',
    },
    add: {
      color: '#0cb10c',
    },
    hide: {
      color: theme.palette.secondary.dark,
    },
    paper: {
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        top: '25%',
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '25%',
        left: '35vw',
        borderRadius: '1em',
        width: theme.spacing.unit * 30,
      },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[10],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
  });

export interface OwnProps {
  cohorts: Cohort[];
  errorMessage: string;
  showAllCohorts: boolean;
  toggleShowCohorts: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Cohorts extends React.Component<Props, {}> {
  render() {
    const cohorts = {
      cohorts: this.props.cohorts,
    };

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" onClick={this.props.toggleShowCohorts}>
              Cohorts
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
        <Divider
          className={
            this.props.showAllCohorts ? '' : this.props.classes.divider
          }
        />
        <Collapse in={this.props.showAllCohorts} timeout="auto" unmountOnExit>
          <ShowAllCohorts {...cohorts} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
