import React from "react";
import ReactDOM from "react-dom";
import {Emoji, EmojiBox, EmojiTextBox} from './emoji';
const io = require('socket.io-client');

var socket = io();

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.handleAddMessage = this.handleAddMessage.bind(this);
    socket.on('add message', this.handleAddMessage);
  }

  handleAddMessage(msg) {
    var newMessages = this.state.messages.slice();
    newMessages.push(msg);
    this.setState({messages: newMessages});
  }

  render() {
    var items = [];
    for (var index in this.state.messages) {
      items.push(<li key={index}>{this.state.messages[index]['fa']}</li>)
    }
    return (<ul>{items}</ul>)
  }
}

class SendMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.handleSend = this.handleSend.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(text) {
    console.log('text is now: ' + text);
    this.setState({message: text});
  }

  handleSend(e) {
    e.preventDefault();
    socket.emit('chat message', this.state.message);
    this.setState({message: ''});
  }

  render() {
    return (<div>
      <EmojiTextBox value={this.state.message} onChange={this.handleTextChange} />
      <button onClick={this.handleSend}>Send</button>
    </div>)
  }
}

class SelectLanguage extends React.Component{
  constructor(props){
    super(props);
    this.state = {languageCodes: {}};
    this.handleListOfLanguages = this.handleListOfLanguages.bind(this);
    // when you receive 'list of languages', run this function with any
    // additional parameters as arguments to the function.
    socket.on('list of languages', this.handleListOfLanguages);
    // send 'get languages' down the connection to the server
    socket.emit('get languages');
  }

  handleListOfLanguages(languageCodes){
    this.setState({languageCodes: languageCodes});
  }

  render(){
    var languages = [];
    for (var shortCode in this.state.languageCodes){
      languages.push(<option value={shortCode} key={shortCode}>
        {this.state.languageCodes[shortCode]}</option>);
    }
    return(
      <select name="languages">
        {languages}
      </select>
  )
  }
}


class BabelChat extends React.Component {
  render() {
    return (
      <div>
        <SelectLanguage />
        <MessageList />
        <SendMessage />
      </div>
    )
  }
}

ReactDOM.render(
  (
  <BabelChat />

  ),
  document.querySelector("#babelchat")
);
