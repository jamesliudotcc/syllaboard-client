import * as React from 'react';
import { connect } from 'react-redux';

type State = {
  auth: {
    isLoggedIn: boolean,
  },
};

type Action = {
  type: string,
  [name: string]: any,
};

export interface Dispatch {
  <R>(asyncAction: (dispatch: Dispatch, getState: () => State) => R): R;
  <R>(asyncAction: (dispatch: Dispatch) => R): R;
  // (neverAction: (dispatch: Dispatch, getState: () => GetState) => never): never;
  (action: Action): void;
  // (action: Thunk): ; // thunks in this app must return a promise
}

// We use generic inference.
function typedConnect<OwnProps, StateProps, DispatchProps>(
  // And "capture" the return of mapStateToProps
  mapStateToProps: (state: State, ownProps: OwnProps) => StateProps,
  // As well as the return of mapDispatchToProps.
  // Or in case you use the shorthand literal syntax, capture it as is.
  mapDispatchToProps?: DispatchProps | ((dispatch: Dispatch, ownProps: OwnProps) => DispatchProps),
) {
  // We combine all generics into the inline component we'll declare.
  return function componentImplementation(component: React.StatelessComponent<OwnProps & StateProps & DispatchProps>) {
    // Finally, we double assert the real connect to let us do anything we want.
    // And export a component that only takes OwnProps.
    return connect(mapStateToProps, mapDispatchToProps as any)(component) as any as React.StatelessComponent<OwnProps>;
  }
}