import React from "react";

// https://en.wikipedia.org/wiki/Emoticons_(Unicode_block)
var emojis = {
  'happy': '😊',
  'laughing': '😄',
  'cool': '😎',
  'winking': '😉',
  'savoring': '😋',
  'hugging': '🤗',
  'sad': '😞',
  'surprise': '😳',
  'angry': '😡',
  'persevering': '😣'
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
    <button type="button" className={props.type} onClick={handleClick}>
      {my_emoji}
    </button>
  );
};

export class EmojiBox extends React.Component {
  render() {
    var emoji = [];
    for (var name in emojis) {
      emoji.push(<Emoji key={name} type={name} onClick={this.props.onSelect} />);
    }
    return (<div className="emojis">{emoji}</div>)
  }
};

export class EmojiTextBox extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.value);
  }

  handleSelect(emoji){
    this.props.onChange(this.props.value + emoji);
  }

  render(){
    return (
    <div className="emojitextbox">
      <EmojiBox onSelect={this.handleSelect} />
      <input ref="textbox" type="text" className="textbox"
              value={this.props.value} onChange={this.handleChange} />
    </div>);
  }
};
