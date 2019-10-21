export default class ComponentModule {
  constructor(component, key, unmount,kargs={}) {
    this.component = component;
    this.key = key;
    this.unmount = unmount;
    this.kargs=kargs
    this.callback = () => {};
  }
  setCallback(func){
    this.callback=func;
  }
  setArgs(kargs){
    this.kargs=kargs;
  }
  static LoadcomponentModule(Component,kargs={}){
    let nkey = this.lastKey++;
    this.setState({
      modules: [
        ...this.state.modules,
        new ComponentModule(
          Component,
          nkey,
          this.unmountComponentModule.bind(this, nkey),
          kargs
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
