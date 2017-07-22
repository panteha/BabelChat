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
  return (
    <button className={props.type}>
      {emojis[props.type]}
    </button>
  );
};

export class EmojiBox extends React.Component {
  render() {
    var emoji = [];
    for (var name in emojis) {
      // React needs a key property for child components
      emoji.push(<Emoji key={name} type={name} />);
    }
    return (<div id="emojis">{emoji}</div>)
  }
};
