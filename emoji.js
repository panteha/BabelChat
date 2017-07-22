import React from "react";

// https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)
var emojis = {
  'happy': '😊',
  'laughing': '😄',
  'cool': '😎',
  'sad': '😞',
  'surprise': '😳',
  'angry': '😡',
};

export function Emoji(props) {
  var my_emoji = emojis[props.type];
  function handleClick(e) {
    e.preventDefault();
    if (props.onClick) {
      props.onClick(my_emoji);
    }
  }
  return (
    <button className={props.type} onClick={handleClick}>
      {my_emoji}
    </button>
  );
};

export class EmojiBox extends React.Component {
  render() {
    var emoji = [];
    for (var name in emojis) {
      // React needs a key property for child components
      emoji.push(<Emoji key={name} type={name} onClick={this.props.onSelect} />);
    }
    return (<div id="emojis">{emoji}</div>)
  }
};

export class EmojiTextBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSelect(emoji){
    this.setState({value: this.state.value + emoji})
  }

  render(){
    return (
    <div>
      <EmojiBox onSelect={this.handleSelect} />
      <input ref="textbox" type="text" className="textbox"
              value={this.state.value} onChange={this.handleChange} />
    </div>);
  }
};
