import ComponentModule from "./ComponentModule"
export function LoadComponent(Component) {
  let nkey=this.lastKey++;
  this.setState({
    modules: [
      ...this.state.modules,
      new ComponentModule(Component, nkey, this.unmountComponent.bind(this, nkey))
    ]
  });
}
