import { Component } from "react";
import Title from "./Title";
import ChatFeed from "./Feed";
import { NavLink } from "react-router-dom";
import Form from "./Form";
class Chat extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: localStorage.getItem("currentUser"),
      otherUser: localStorage.getItem("otherUser"),
      messages: [],
      chatId: "",
    };
  }

  componentDidMount = () => {
    console.log("we are going to find this chat");
    console.log(this.state.currentUser, this.state.otherUser);
    fetch(
      `http://localhost:3001/chat/${this.state.currentUser}/${this.state.otherUser}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.chatId);
        this.setState({ chatId: data.chatId });
        fetch('http://localhost:3001/message/' + data.chatId)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.messages);
            this.setState({messages: data.messages})
          });
      });
  };

  render() {
    return (
      <div>
        <Title />
        <ChatFeed chatId={this.state.chatId} messages={this.state.messages} />
        <Form chatId={this.state.chatId} />
        <NavLink to="/profile">Back to Profile</NavLink>
      </div>
    );
  }
}

export default Chat;
