import { Component } from "react";

class ChatFeed extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1> Chat Feed </h1>
        {this.props.messages.map((message) => {
          return (
            <div key={message.id}>
             <p>{message.message}</p>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ChatFeed;
