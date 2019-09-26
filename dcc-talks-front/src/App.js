import React, { lazy, Suspense } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

import Login from "./components/Login";
import Side from "./components/Side";
import Button from "./components/Button"

import {LoadComponent} from "./utils/LoadComponent"


const LoadingMessage = () => "I'm loading...";

class App extends React.Component {
  constructor(props){
    super(props);
    this.LoadComponent = LoadComponent.bind(this);
    this.LazyLoad = this.LazyLoad.bind(this);
    this.state = {
      modules: [Login]
    };
  }

  //@@@Nao funciona
  LazyLoad(ComponentPath){
    this.setState({modules: [...this.state.modules, lazy(() => import(ComponentPath))]});
  }
  render() {
    const { modules } = this.state;

    return (
      <div className="App">
        <Suspense fallback={<LoadingMessage />}>
          {modules.map((item, i) => {
            let Module = modules[i];
            return <Module key={i} />;
          })}
        </Suspense>
        <button onClick={() => this.LoadComponent(Button)}>Cria Button</button>  <button onClick={() => this.setState({modules: [...this.state.modules, lazy(() => import("./components/Button"))]})}>Cria Lazy Button </button>
      </div>
    );
  }
}
export default App;
