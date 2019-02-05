import { connect } from 'react-redux';

type Func<T> = ({...args}: any) => T;

export function connectedComponentHelper<TProps>() {
  return <TStateProps, TDispatchProps>(
    mapStateToProps: Func<TStateProps>,
    mapDispatchToProps?: Func<TDispatchProps>) => (
      {
        connect: (component: any) => connect(mapStateToProps, mapDispatchToProps)(
          component) as any as React.ComponentClass<TProps>,
        propsGeneric: null as unknown as TProps & TStateProps & TDispatchProps,
      });
}
