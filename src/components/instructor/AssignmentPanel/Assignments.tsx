import * as React from 'react';

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

// Types
import { Assignment, NewAssignmentInfo, NewDeliverableInfo, ID } from '../../../Types';

// Forms
import AddAssignmentForm from './AddAssignment_form';
import AddDeliverableForm from './AddDeliverable_form';
import EditAssignmentForm from './EditAssignment_form';
import ShowAllAssignments from './ShowAllAssignments';

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
  assignments: Assignment[];
  cohortInfo: Array<{ name: string, value: ID }>;
  errorMessage: string;
  showAddAssignment: boolean;
  showAllAssignments: boolean;
  showEditAssignment: boolean;
  selectedAssignment: Assignment | null;
  showAddDeliverable: boolean;
  selectAssignment: (assignment: Assignment | null) => void;
  toggleAddAssignment: () => void;
  toggleEditAssignment: () => void;
  toggleShowAssignments: () => void;
  addNewAssignment: (input: NewAssignmentInfo) => void;
  removeAssignment: (input: Assignment) => void;
  updateAssignment: (input: Assignment) => void;
  addNewDeliverable: (input: NewDeliverableInfo) => void;
  toggleAddDeliverable: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Assignments extends React.Component<Props, {}> {
  handleSubmit = (input: NewAssignmentInfo) => {
    this.props.toggleAddAssignment();
    this.props.addNewAssignment(input);
  };

  handleEditSubmit = (input: Assignment) => {
    this.props.selectAssignment(null);
    this.props.updateAssignment(input);
  };

  handleNewDeliverable = (input: NewDeliverableInfo) => {
    this.props.selectAssignment(null);
    this.props.toggleShowAssignments();
    this.props.addNewDeliverable(input);
  }

  render() {
    const assignments = {
      assignments: this.props.assignments,
      removeAssignment: this.props.removeAssignment,
      updateAssignment: this.props.updateAssignment,
      selectAssignment: this.props.selectAssignment,
    };

    const editAssignmentPanel = (
      <Modal
        open={this.props.showEditAssignment}
        onClose={
          this.props.showEditAssignment
            ? this.props.toggleEditAssignment
            : () => {
              return;
            }
        }
      >
        <div className={this.props.classes.paper}>
          <EditAssignmentForm
            onSubmit={this.handleEditSubmit}
            errorMessage={this.props.errorMessage}
            assignment={this.props.selectedAssignment as Assignment}
          />
        </div>
      </Modal>
    );

    const newDeliverablePanel = (
      <Modal
        open={this.props.showAddDeliverable}
        onClose={
          this.props.showAddDeliverable
            ? this.props.toggleAddDeliverable
            : () => {
              return;
            }
        }
      >
        <div className={this.props.classes.paper}>
          <AddDeliverableForm
            onSubmit={this.handleNewDeliverable}
            errorMessage={this.props.errorMessage}
            assignmentId={(this.props.selectedAssignment as Assignment)._id}
            cohorts={this.props.cohortInfo}
          />
        </div>
      </Modal>
    );

    const addAssignmentPanel = this.props.showAddAssignment ? (
      <div>
        <AddAssignmentForm
          onSubmit={this.handleSubmit}
          errorMessage={this.props.errorMessage}
        />
      </div>
    ) : (
        <div />
      );

    const toggleBtn = !this.props.showAddAssignment ? <Add /> : <Remove />;

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" onClick={this.props.toggleShowAssignments}>
              Assignments
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Add Assignment"
              onClick={this.props.toggleAddAssignment}
              className={
                this.props.showAddAssignment
                  ? this.props.classes.hide
                  : this.props.classes.add
              }
            >
              {toggleBtn}
            </IconButton>
          </Grid>
        </Grid>
        <Divider
          className={
            this.props.showAllAssignments ? '' : this.props.classes.divider
          }
        />
        {addAssignmentPanel}
        {editAssignmentPanel}
        <Collapse
          in={this.props.showAllAssignments}
          timeout="auto"
          unmountOnExit
        >
          <ShowAllAssignments {...assignments} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Assignments);
