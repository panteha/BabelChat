import React from "react";
import ReactDOM from "react-dom";

class HelloWorld extends React.Component {
  render() {
    return (
      <p>Hello, {this.props.greetTarget}!</p>
    );
  }
};

ReactDOM.render(
  <div>
    <HelloWorld greetTarget="Batman"/>
  </div>,
  document.querySelector("#container")
);
