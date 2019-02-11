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
import * as React from 'react';
// Types
import { Deliverable, TurnInDeliverableInfo } from '../../../Types';

// Forms
import ShowAllDeliverables from './ShowAllDeliverables';
import TurnInDeliverableForm from './TurnInDeliverable_form';

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
        height: theme.spacing.unit * 20,
      },
      [theme.breakpoints.up('sm')]: {
        position: 'absolute',
        top: '25%',
        left: '35vw',
        borderRadius: '1em',
        width: theme.spacing.unit * 30,
        height: theme.spacing.unit * 20,
      },
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[10],
      padding: theme.spacing.unit * 4,
      outline: 'none',
    },
  });

export interface OwnProps {
  deliverables: Deliverable[];
  errorMessage: string;
  showTurnInDeliverable: boolean;
  showAllDeliverables: boolean;
  selectedDeliverable: Deliverable | null;
  selectDeliverable: (deliverable: Deliverable | null) => void;
  toggleTurnInDeliverable: () => void;
  toggleShowDeliverables: () => void;
  updateDeliverable: (input: TurnInDeliverableInfo) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Deliverables extends React.Component<Props, {}> {
  handleEditSubmit = (input: TurnInDeliverableInfo) => {
    this.props.selectDeliverable(null);
    this.props.updateDeliverable(input);
  };

  render() {
    const deliverables = {
      deliverables: this.props.deliverables,
      updateDeliverable: this.props.updateDeliverable,
      selectDeliverable: this.props.selectDeliverable,
    };
    const editDeliverablePanel = (
      <Modal
        open={this.props.showTurnInDeliverable}
        onClose={
          this.props.showTurnInDeliverable
            ? this.props.toggleTurnInDeliverable
            : () => {
                return;
              }
        }
      >
        <div className={this.props.classes.paper}>
          <TurnInDeliverableForm
            onSubmit={this.handleEditSubmit}
            errorMessage={this.props.errorMessage}
            deliverable={this.props.selectedDeliverable as Deliverable}
          />
        </div>
      </Modal>
    );

    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography
              variant="h4"
              onClick={this.props.toggleShowDeliverables}
            >
              Deliverables
            </Typography>
          </Grid>
          <Grid item />
        </Grid>
        <Divider
          className={
            this.props.showAllDeliverables ? '' : this.props.classes.divider
          }
        />
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
