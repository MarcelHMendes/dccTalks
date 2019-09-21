import React, { lazy, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import socketIOClient from "socket.io-client";

import Side from "./components/Side";

const LoadingMessage = () => "I'm loading...";

class App extends React.Component {
  state = {
    modules: [
      lazy(() => import("./components/Side")),
      lazy(() => import("./components/Container"))
    ]
  };
  //console.log(Side.render())
  render() {
    const { modules } = this.state;

    return (
      <div className="App">
        <h1>App</h1>
        <Suspense fallback={<LoadingMessage />}>
          {modules.map((item, i) => {
            let Module = modules[i];
            return <Module key={i} />;
          })}
          <Side />
        </Suspense>
      </div>
    );
  }
}

export default App;
