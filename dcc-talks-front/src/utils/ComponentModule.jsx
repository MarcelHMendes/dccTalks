export default class ComponentModule {
  constructor(component, key, unmount) {
    this.component = component;
    this.key = key;
    this.unmount = unmount;
    this.kargs={};
    this.callback = () => {};
  }
  setCallback(func){
    this.callback=func;
  }
  setArgs(kargs){
    this.kargs=kargs;
  }
  static LoadcomponentModule(Component) {
    let nkey = this.lastKey++;
    this.setState({
      modules: [
        ...this.state.modules,
        new ComponentModule(
          Component,
          nkey,
          this.unmountComponentModule.bind(this, nkey)
        )
      ]
    });
    return nkey;
  }
  static unmountComponentModule(idx){

    let filteredArray = this.state.modules.filter(item => item.key !== idx);
    this.setState({ modules: filteredArray });
  }
}
