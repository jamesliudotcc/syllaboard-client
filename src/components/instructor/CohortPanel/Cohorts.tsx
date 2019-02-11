// Material UI components
import {
  createStyles,
  Modal,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';

import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/AddCircleOutline';
import Remove from '@material-ui/icons/RemoveCircleOutline';
import * as React from 'react';
// Types
import { Cohort, NewCohortInfo } from '../../../Types';

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
      margin: '25% auto',
      width: theme.spacing.unit * 50,
      height: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
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
    // const editCohortPanel = (
    //   <Modal
    //     open={this.props.showEditCohort}
    //     onClose={
    //       this.props.showEditCohort
    //         ? this.props.toggleEditCohort
    //         : () => { return; }
    //     }
    //   >
    //     <div className={this.props.classes.paper}>
    //       <EditCohortForm
    //         onSubmit={this.handleEditSubmit}
    //         errorMessage={this.props.errorMessage}
    //         cohort={this.props.selectedCohort as Cohort}
    //       />
    //     </div>
    //   </Modal>
    // );

    // const addCohortPanel = this.props.showAddCohort ? (
    //   <div>
    //     <AddCohortForm
    //       onSubmit={this.handleSubmit}
    //       errorMessage={this.props.errorMessage}
    //     />
    //   </div>
    // ) : (
    //     <div />
    //   );

    // const toggleBtn = !this.props.showAddCohort ? <Add /> : <Remove />;

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
          <Grid item>
          </Grid>
        </Grid>
        <Divider className={this.props.showAllCohorts ? '' : this.props.classes.divider} />
        <Collapse in={this.props.showAllCohorts} timeout="auto" unmountOnExit>
          <ShowAllCohorts {...cohorts} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Cohorts);
