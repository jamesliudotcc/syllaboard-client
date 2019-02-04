// NON FUNCTIONING!
// TODO: Figure out types for react-redux connect function


import * as React from 'react';
import { connect } from 'react-redux';
import * as AT from './actions/types';
import { State } from './reducers/index';

// export interface Dispatch {
//   <R>(asyncAction: (dispatch: Dispatch, getState: () => State) => R): R;
//   <R>(asyncAction: (dispatch: Dispatch) => R): R;
//   (action: AT.Action): void;
// }

// export type DispatchFunction = (dispatch: Dispatch) => void;

// export type AsyncDispatch = (args?: any) => DispatchFunction;

export interface Credentials {
  email: string;
  password: string;
  passwordConfirmation?: string;
}

// We use generic inference.
// export function typedConnect<OwnProps, StateProps, DispatchProps>(
//   // And "capture" the return of mapStateToProps
//   mapStateToProps: (state: State, ownProps: OwnProps) => StateProps,
//   // As well as the return of mapDispatchToProps.
//   // Or in case you use the shorthand literal syntax, capture it as is.
//   mapDispatchToProps?: DispatchProps | ((dispatch: Dispatch, ownProps: OwnProps) => DispatchProps),
// ) {
//   // We combine all generics into the inline component we'll declare.
//   return function componentImplementation(component: React.StatelessComponent<OwnProps & StateProps & DispatchProps>) {
//     // Finally, we double assert the real connect to let us do anything we want.
//     // And export a component that only takes OwnProps.
//     // @ts-ignore
//     return connect(mapStateToProps, mapDispatchToProps as any)(component) as any as React.StatelessComponent<OwnProps>;
//   };
// }
