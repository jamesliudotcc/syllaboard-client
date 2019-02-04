import { connect } from 'react-redux';

interface Func<T> {
  ({...args}: any): T;
}

// type Func<T> = ([...args]: any) => T;

export function connectedComponentHelper<TProps>() {
  return <TStateProps, TDispatchProps>(
    mapStateToProps: Func<TStateProps>,
    mapDispatchToProps?: Func<TDispatchProps>) => (
      {
        propsGeneric: null as unknown as TProps & TStateProps & TDispatchProps,
        connect: (component: any) => connect(mapStateToProps, mapDispatchToProps)(
          component) as any as React.ComponentClass<TProps>,
      });
}
