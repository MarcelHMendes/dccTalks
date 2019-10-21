import React, { lazy, Suspense } from "react";
import "./App.css";

import Login from "./components/Login";
import ChatBox from "./components/ChatBox";


import socketHandler from "./utils/socketHandler";
import ComponentModule from "./utils/ComponentModule";

const LoadingMessage = () => "I'm loading...";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.LazyLoad = this.LazyLoad.bind(this);
    this.LoadComponentModule = ComponentModule.LoadcomponentModule.bind(this);
    this.unmountComponentModule = ComponentModule.unmountComponentModule.bind(this);

    this.state = {
      modules: [
        new ComponentModule(Login, 0, this.unmountComponentModule.bind(this, 0))
      ],
      username: "temp",
      password: ""
    };
    this.lastKey = 1;
    this.socketHandler = new socketHandler("localhost:5000");
    this.state.modules[0].setArgs({
      socketEntrar: (value, callback) =>
        this.socketHandler.connect(value, callback),
      retv: value => {
        this.state.username = value;
        this.LoadComponentModule(ChatBox, {
          sendMessage: (message, callback) => this.socketHandler.sendMessage(message, callback),
          messagesUpdate: (msg) => this.socketHandler.messagesUpdate(msg),
          messageHistory: (msg) => this.socketHandler.messageHistory(msg)
        });
      }
    });
  }
  //@@@Nao funciona
  LazyLoad(ComponentPath) {
    this.setState({
      modules: [...this.state.modules, lazy(() => import(ComponentPath))]
    });
  }

  render() {
    const { modules } = this.state;
    return (
      <div className="App">
        <Suspense fallback={<LoadingMessage />}>
          {modules.map((item, key) => {
            return (
              <item.component
                key={item.key}
                rfr={item.key}
                unmount={item.unmount}
                {...item.kargs}
              />
            );
          })}
        </Suspense>
      </div>
    );
  }
}
export default App;
