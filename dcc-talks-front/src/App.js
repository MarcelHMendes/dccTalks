import React, { lazy, Suspense } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

import Login from "./components/Login";
import Side from "./components/Side";
import Button from "./components/Button";
import ChatBox from "./components/ChatBox";

import ioClient from "socket.io-client";

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
    this.socket = ioClient("localhost:5000");
    this.state.modules[0].setArgs({
      socketEntrar: (value, callback) => this.socket.emit("entrar", value, callback),
      retv: (value) => {
        this.state.username=value;
        let idx = this.LoadComponentModule(ChatBox);
        this.state.modules[idx].setArgs({
          sendMessage: (message, callback) => this.socket.emit("chat_message_send", message, callback),
          receiveMessage: (msg) => this.socket.on('chat_message_update', msg)
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
        <button onClick={() => this.LoadComponentModule(Button)}>
          Cria Button
        </button>{" "}
        <button
          onClick={() =>
            this.setState({
              modules: [
                ...this.state.modules,
                [
                  new ComponentModule(
                    lazy(() => import("./components/Button")),
                    1,
                    this.unmountComponent.bind(this, 1)
                  )
                ]
              ]
            })
          }
        >
          Cria Lazy Button{" "}
        </button>
      </div>
    );
  }
}
export default App;
