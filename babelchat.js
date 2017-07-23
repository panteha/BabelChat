import React from "react";
import ReactDOM from "react-dom";
import {Emoji, EmojiBox, EmojiTextBox} from './emoji';
const io = require('socket.io-client');

var socket = io();

export class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.handleAddMessage = this.handleAddMessage.bind(this);
    var my_socket = this.props.socket || socket;
    my_socket.on('add message', this.handleAddMessage);
  }

  handleAddMessage(msg) {
    var newMessages = this.state.messages.slice();
    newMessages.push(msg);
    this.setState({messages: newMessages});
  }

  render() {
    var items = [];
    for (var index in this.state.messages) {
      items.push(<li key={index}>{this.state.messages[index][this.props.language]}</li>)
    }
    return (<ul>{items}</ul>)
  }
}

export class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.handleSend = this.handleSend.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(text) {
    this.setState({message: text});
  }

  handleSend(e) {
    e.preventDefault();
    socket.emit('chat message', this.state.message);
    this.setState({message: ''});
  }

  render() {
    return (<form onSubmit={this.handleSend}>
      <EmojiTextBox value={this.state.message} onChange={this.handleTextChange} />
      <input type="submit" value="Send" />
    </form>)
  }
}

export class SelectLanguage extends React.Component{
  constructor(props){
    super(props);
    this.state = {languageCodes: {}};
    this.handleListOfLanguages = this.handleListOfLanguages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    var my_socket = this.props.socket || socket;
    // when you receive 'list of languages', run this function with any
    // additional parameters as arguments to the function.
    my_socket.on('list of languages', this.handleListOfLanguages);
    // send 'get languages' down the connection to the server
    my_socket.emit('get languages');
  }

  handleListOfLanguages(languageCodes){
    this.setState({languageCodes: languageCodes});
  }

  handleChange(event){
    this.props.onChange(event.target.value);
  }

  render(){
    var languages = [];
    for (var shortCode in this.state.languageCodes){
      languages.push(<option value={shortCode} key={shortCode}>
        {this.state.languageCodes[shortCode]}</option>);
    }
    return(
      <select value={this.props.language} onChange={this.handleChange}>
        {languages}
      </select>
  )
  }
}


export class BabelChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {language: 'en'};
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  handleLanguageChange(newLanguage){
    this.setState({language: newLanguage});
    console.log("New chosen language is:" + newLanguage);
  }

  render() {
    return (
      <div>
        <SelectLanguage language={this.state.language}
                        onChange={this.handleLanguageChange} />
        <MessageList language={this.state.language} />
        <SendMessage />
      </div>
    )
  }
}
