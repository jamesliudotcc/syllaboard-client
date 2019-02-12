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
import Typography from '@material-ui/core/Typography';


// Types
import { Deliverable, GradeDeliverableInfo, NewDeliverableInfo } from '../../../Types';

// Forms
import GradeDeliverableForm from './GradeDeliverable_form';
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
  deliverables: Deliverable[];
  errorMessage: string;
  showAllDeliverables: boolean;
  showGradeDeliverable: boolean;
  selectedDeliverable: Deliverable | null;
  selectDeliverable: (deliverable: Deliverable | null) => void;
  toggleGradeDeliverable: () => void;
  toggleShowDeliverables: () => void;
  removeDeliverable: (input: Deliverable) => void;
  gradeDeliverable: (input: GradeDeliverableInfo) => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

class Deliverables extends React.Component<Props, {}> {

  handleGradeSubmit = (input: GradeDeliverableInfo) => {
    this.props.selectDeliverable(null);
    this.props.gradeDeliverable(input);
  };

  render() {
    const deliverables = {
      deliverables: this.props.deliverables,
      removeDeliverable: this.props.removeDeliverable,
      gradeDeliverable: this.props.gradeDeliverable,
      selectDeliverable: this.props.selectDeliverable,
    };

    const gradeDeliverablePanel = (
      <Modal
        open={this.props.showGradeDeliverable}
        onClose={
          this.props.showGradeDeliverable
            ? this.props.toggleGradeDeliverable
            : () => {
                return;
              }
        }
      >
        <div className={this.props.classes.paper}>
          <GradeDeliverableForm
            onSubmit={this.handleGradeSubmit}
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
            <Typography variant="h4" onClick={this.props.toggleShowDeliverables}>
              Deliverables
            </Typography>
          </Grid>
          <Grid item>
          </Grid>
        </Grid>
        <Divider
          className={
            this.props.showAllDeliverables ? '' : this.props.classes.divider
          }
        />
        {gradeDeliverablePanel}
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
