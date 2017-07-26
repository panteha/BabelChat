import React from "react";

export class NavItem extends React.Component{
  render() {
    return (
      <li><a style={this.props.aStyle} href={this.props.href}>{this.props.title}</a></li>
    );
  }
}
