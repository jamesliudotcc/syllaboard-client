import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/AddCircleOutline';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import * as React from 'react';
import { Cohort, NewCohortInfo } from '../../../Types';
import AddCohortForm from './AddCohort_form';
import ShowAllCohorts from './ShowAllCohorts';
import Collapse from '@material-ui/core/Collapse';

const styles = (theme: Theme) =>
  createStyles({
    spaced: {
      margin: theme.spacing.unit,
    },
    add: {
      color: '#0cb10c',
    },
    hide: {
      color: theme.palette.secondary.dark,
    },
  });

export interface OwnProps {
  cohorts: Cohort[];
  errorMessage: string;
  showAddCohort: boolean;
  showAllCohorts: boolean;
  toggleAddCohort: () => void;
  toggleShowCohorts: () => void;
  addNewCohort: (input: NewCohortInfo) => void;
  removeCohort: (input: Cohort) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Cohorts extends React.Component<Props, {}> {
  handleSubmit = (input: NewCohortInfo) => {
    this.props.toggleAddCohort();
    this.props.addNewCohort(input);
  };

  render() {
    const cohorts = {
      cohorts: this.props.cohorts,
      removeCohort: this.props.removeCohort,
    };

    const addCohortPanel = this.props.showAddCohort ? (
      <div>
        <AddCohortForm
          onSubmit={this.handleSubmit}
          errorMessage={this.props.errorMessage}
        />
      </div>
    ) : (
      <div />
    );

    const toggleBtn = !this.props.showAddCohort ? <Add /> : <Remove />;

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" onClick={this.props.toggleShowCohorts} >Cohorts</Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Add Cohort"
              onClick={this.props.toggleAddCohort}
              className={
                this.props.showAddCohort
                  ? this.props.classes.hide
                  : this.props.classes.add
              }
            >
              {toggleBtn}
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        {addCohortPanel}
        <Collapse in={this.props.showAllCohorts} timeout="auto" unmountOnExit>
          <ShowAllCohorts {...cohorts} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
