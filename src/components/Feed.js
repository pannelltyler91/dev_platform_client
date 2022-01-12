import { Component } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { NavLink,Redirect } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
        this.setState({ userId: data.userId });
        this.setState({ profileLink: `/profile/${this.state.userId}` })
        //let profile = `/profile/${this.state.userId}`;
        //console.log(profile);
      });
  };


  _handleInitiateChat = (e) => {
    console.log(this.state.userId, e.target.id);
    const data = { currentUserId: this.state.userId.toString(), otherUserId: e.target.id };
    localStorage.setItem("currentUser", data.currentUserId)
    localStorage.setItem("otherUser", data.otherUserId)
    localStorage.getItem('otherUser')
    localStorage.getItem('currentUser')

    fetch('http://localhost:3001/chat/create/' + e.target.name, {
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
    if (this.state.created) {
      return <Redirect to='/chat' />
    }
    return (
      <div className="main">
        {/* <Container> */}


        <Navbar expand="md" collapseOnSelect>
          <Container>
            <Navbar.Brand href="#home">

            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mx-auto">
                <NavLink className="navLinks me-2" to={this.state.profileLink}>
                  My Profile
                </NavLink>
                <NavLink id="profileLink" className="profileLink navLinks me-2" to="/profile">
                  Near Me
                </NavLink>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="mainHeading"><span id="DEVTitle">Dev</span><span id="PlatformTitle">Platform</span></div>

        <Card className="Cards">
          {this.state.matchedUsers.map((user) => {
            const [firstElement, secondElement, thirdElement] = user.currentLanguages;
            const [firstIndex, secondIndex, thirdIndex] = user.newLanguages;
            return (
              <Card key={user.id} className="card" >
                <div className="yell-back text-center card_header" as="h4">
                  <div className="username">{user.username}{" "}</div>

                  <div className="card_social_links">
                    <a className="text-end" rel="noreferrer" target="_blank" href={user.github}>  </a>
                    <a className="text-end" rel="noreferrer" target="_blank" href={user.linkedin}>  </a>
                    <a className="text-end" rel="noreferrer" target="_blank" href={user.portfolio}> </a>
                  </div>

                </div>

                <div className="card_body language_info">
                  <ul className="body-text my-language">
                    <div className="language_title"> My Languages: </div>
                    <li> {firstElement} </li>
                    <li> {secondElement} </li>
                    <li> {thirdElement} </li>
                  </ul>

                  <ul className="body-text curious-language ">
                    <div className="language_title"> Languages I want to Learn: </div>

                    <li> {firstIndex} </li>
                    <li> {secondIndex} </li>
                    <li> {thirdIndex} </li>
                  </ul>

                </div>

                <Button name={user.username} id={user.id} onClick={this._handleInitiateChat}>Chat</Button>
              </Card>
            );
          })}
        </Card>
      </div>
    );
  }
}

export default Feed;
