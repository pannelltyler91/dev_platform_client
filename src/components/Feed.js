import { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink,Redirect } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import "../styles/Feed.css";

class Feed extends Component {
  constructor() {
    super();
    this.state = {
      matchedUsers: [],
      userId: "",
      profileLink: "",
      created:false,
      spinner: ''
    };
  }

  componentDidMount = () => {
    this.setState({ spinner: <Spinner animation="border" variant="info" /> })
    fetch(
      `http://localhost:3001/user/${localStorage.getItem(
        "username"
      )}/users/feed`
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.matchedUsers);
        this.setState({ spinner: ''})
        this.setState({ matchedUsers: data.matchedUsers });
        this.setState({userId: data.userId});
        this.setState({profileLink: `/profile/${this.state.userId}`})
        //let profile = `/profile/${this.state.userId}`;
        //console.log(profile);
      });
  };


  _handleInitiateChat = (e) => {
    console.log(this.state.userId, e.target.id);
    const data = { currentUserId:this.state.userId.toString(),otherUserId:e.target.id };
    localStorage.setItem("currentUser",data.currentUserId)
    localStorage.setItem("otherUser", data.otherUserId)
    localStorage.getItem('otherUser')
    localStorage.getItem('currentUser')

    fetch('http://localhost:3001/chat/create', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data.message,data.created);
      if(data.created){
        this.setState({created:true})  
      }
    })
  };

  render() {
    if(this.state.created){
      return <Redirect to='/chat'/>
    }
    return (
      <Container>
        <div id="menuBar">
          <NavLink id="profileLink" to={this.state.profileLink}>
            My Profile
          </NavLink>
          <div className="">{this.state.spinner}</div>
          <NavLink id="profileLink" to="/profile">
            Near Me
          </NavLink>
        </div>
        {this.state.matchedUsers.map((user) => {
          const [firstElement, secondElement, thirdElement] =
            user.currentLanguages;
          const [firstIndex, secondIndex, thirdIndex] = user.newLanguages;
          return (
            <Card key={user.id} style={{ margin: "15px" }}>
              <Card.Header
                className="yell-back"
                style={{ backgroundColor: "#fae596" }}
              >
                {" "}
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Card.Text className="text-end">
                    <a href={user.github} target="_blank" rel="noreferrer">
                      <Card.Subtitle className="text-end">Github</Card.Subtitle>
                    </a>
                  </Card.Text>
                  <Card.Text className="text-end">
                    <a href={user.linkedin} target="_blank" rel="noreferrer">
                      <Card.Subtitle className="text-end">
                        LinkedIn
                      </Card.Subtitle>
                    </a>
                  </Card.Text>
                  <Card.Text className="text-end">
                    <a href={user.portfolio} target="_blank" rel="noreferrer">
                      <Card.Subtitle className="text-end">
                        Portfolio
                      </Card.Subtitle>
                    </a>
                  </Card.Text>
                </div>
                <Card.Title as="h4" className="text-center">
                  {user.username}{" "}
                </Card.Title>
              </Card.Header>
              <Card.Body style={{ backgroundColor: "#dddfd4" }}>
                <Card.Subtitle className="body-text">
                  My Languages:
                </Card.Subtitle>
                <Card.Text className="body-text" style={{ color: "#3FB0AC" }}>
                  {firstElement}, {secondElement}, {thirdElement}
                </Card.Text>
                <Card.Subtitle className="body-text">
                  Languages I want to Learn:
                </Card.Subtitle>
                <Card.Text className="body-text">
                  {firstIndex}, {secondIndex}, {thirdIndex}
                </Card.Text>

                <Card.Footer
                  className="yell-back"
                  style={{ backgroundColor: "#fae596" }}
                >
                  <p className="body-text">
                    <i>{user.banner}</i>
                  </p>
                </Card.Footer>
              </Card.Body>
              <Button
                id={user.id}
                className="yell-back"
                style={{ backgroundColor: "#fae596" }}
                onClick={this._handleInitiateChat}
              >
                Start Chat
              </Button>
            </Card>
          );
        })}
      </Container>
    );
  }
}

export default Feed;
