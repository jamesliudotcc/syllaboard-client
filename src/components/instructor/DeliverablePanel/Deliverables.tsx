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
import { Deliverable, NewDeliverableInfo } from '../../../Types';

// Forms
import AddDeliverableForm from './AddDeliverable_form';
import EditDeliverableForm from './EditDeliverable_form';
import ShowAllDeliverables from './ShowAllDeliverables';

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
  deliverables: Deliverable[];
  errorMessage: string;
  showAddDeliverable: boolean;
  showAllDeliverables: boolean;
  showEditDeliverable: boolean;
  selectedDeliverable: Deliverable | null;
  selectDeliverable: (deliverable: Deliverable | null) => void;
  toggleAddDeliverable: () => void;
  toggleEditDeliverable: () => void;
  toggleShowDeliverable: () => void;
  addNewDeliverable: (input: NewDeliverableInfo) => void;
  removeDeliverable: (input: Deliverable) => void;
  updateDeliverable: (input: Deliverable) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Deliverables extends React.Component<Props, {}> {
  handleSubmit = (input: NewDeliverableInfo) => {
    this.props.toggleAddDeliverable();
    this.props.addNewDeliverable(input);
  };

  handleEditSubmit = (input: Deliverable) => {
    this.props.selectDeliverable(null);
    this.props.updateDeliverable(input);
  };

  render() {
    const deliverables = {
      deliverables: this.props.deliverables,
      removeDeliverable: this.props.removeDeliverable,
      updateDeliverable: this.props.updateDeliverable,
      selectDeliverable: this.props.selectDeliverable,
    };

    const editDeliverablePanel = (
      <Modal
        open={this.props.showEditDeliverable}
        onClose={
          this.props.showEditDeliverable
            ? this.props.toggleEditDeliverable
            : () => {
                return;
              }
        }
      >
        <div className={this.props.classes.paper}>
          <EditDeliverableForm
            onSubmit={this.handleEditSubmit}
            errorMessage={this.props.errorMessage}
            deliverable={this.props.selectedDeliverable as Deliverable}
          />
        </div>
      </Modal>
    );

    const addDeliverablePanel = this.props.showAddDeliverable ? (
      <div>
        <AddDeliverableForm
          onSubmit={this.handleSubmit}
          errorMessage={this.props.errorMessage}
        />
      </div>
    ) : (
      <div />
    );

    const toggleBtn = !this.props.showAddDeliverable ? <Add /> : <Remove />;

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" onClick={this.props.toggleShowDeliverable}>
              Deliverables
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Add Deliverable"
              onClick={this.props.toggleAddDeliverable}
              className={
                this.props.showAddDeliverable
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
            this.props.showAllDeliverables ? '' : this.props.classes.divider
          }
        />
        {addDeliverablePanel}
        {editDeliverablePanel}
        <Collapse
          in={this.props.showAllDeliverables}
          timeout="auto"
          unmountOnExit
        >
          <ShowAllDeliverables {...deliverables} />
        </Collapse>
      </div>
    );
  }
}

export default withStyles(styles)(Deliverables);
