export function LoadComponent(Component) {
    this.setState({modules: [...this.state.modules, Component]});
};
