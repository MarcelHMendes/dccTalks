import React, { Component } from "react";
export default class Button extends Component {
  constructor() {
     super()
    this.state = { count: 0 };
  }
  /*incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };*/
  incrementCount(){
      this.setState({count: this.state.count+1});
  }
  decrementCount= () => {
    this.setState({
      count:this.state.count-1
    })
  };
  render() {
    let { count } =this.state
    
    return <div>
    <h2>Count: { count } </h2>
    <button onClick={this.incrementCount.bind(this)}>Incrementa</button>
    </div>;
  }
}
