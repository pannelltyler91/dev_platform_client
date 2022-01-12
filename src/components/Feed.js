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

        <Card.Group className="Cards">
          {this.state.matchedUsers.map((user) => {
            const [firstElement, secondElement, thirdElement] =
              user.currentLanguages;
            const [firstIndex, secondIndex, thirdIndex] = user.newLanguages;
            return (

              <div key={user.id} className="Card" >

                {/* User id */}
                <div className="yell-back text-center card_header " as="h4">
                  {/* {" "} */}

                  <div className="username">
                    {user.username}{" "}
                  </div>

                  {/* <div className="yell-back "> */}
                  {/* User social profiles */}
                  <div className="card_social_links">
                    {/* User Github Link */}
                    <a className="text-end" rel="noreferrer" target="_blank" href={user.github}>  </a>
                    {/* User LinkedIn link */}
                    <a className="text-end" rel="noreferrer" target="_blank" href={user.linkedin}>  </a>
                    {/* User Portfolio Link */}
                    <a className="text-end" rel="noreferrer" target="_blank" href={user.portfolio}> </a>
                  </div>

                  {/* <img src={user.pic} /> */}
                </div>

                <div className="Card_Body language_info">

                  {/* <div className="language_info" > */}
                  {/* Known user languages */}
                  <ul className="body-text my-language">
                    <div className="language_title"> My Languages: </div>
                    <li> {firstElement} </li>
                    <li> {secondElement} </li>
                    <li> {thirdElement} </li>
                  </ul>

                  {/* Languages User wants to learn */}
                  <ul className="body-text curious-language ">
                    <div className="language_title"> Languages I want to Learn: </div>

                    <li> {firstIndex} </li>
                    <li> {secondIndex} </li>
                    <li> {thirdIndex} </li>
                  </ul>
                  {/* </div> */}



                </div>






                <Button
                  id={user.id}

                  onClick={this._handleInitiateChat}
                >
                  Chat
                </Button>

                {/* <p className="body-text">
                    <i>{user.banner}</i>
                  </p> */}
              </div>
              // </div>




              // <Card key={user.id} className="Card" >
              //   <Card.Header
              //   // className="yell-back"
              //   >
              //     {" "}

              //     <Card.Title as="h4" className="text-center">
              //       {user.username}{" "}
              //     </Card.Title>
              //   </Card.Header>
              //   <Card.Body className="Card_Body">
              //     <Card.Subtitle className="body-text">
              //       My Languages:
              //     </Card.Subtitle>
              //     <Card.Text className="body-text">
              //       {firstElement}, {secondElement}, {thirdElement}
              //     </Card.Text>
              //     <Card.Subtitle className="body-text">
              //       Languages I want to Learn:
              //     </Card.Subtitle>
              //     <Card.Text className="body-text">
              //       {firstIndex}, {secondIndex}, {thirdIndex}
              //     </Card.Text>

              //     <Card.Footer
              //       className="yell-back"
              //     >
              //       {/* User social profiles */}
              //       <div className="card_social_links">
              //         {/* User Github Link */}
              //         <Card.Link className="text-end" rel="noreferrer" target="_blank" href={user.github}>  <img src={GitHubPic} /> </Card.Link>
              //         {/* User LinkedIn link */}
              //         <Card.Link className="text-end" rel="noreferrer" target="_blank" href={user.linkedin}>  <img src={linkedinLogo} /> </Card.Link>
              //         {/* User Portfolio Link */}
              //         <Card.Link className="text-end" rel="noreferrer" target="_blank" href={user.portfolio}>  Portfolio </Card.Link>
              //       </div>

              //       <p className="body-text">
              //         <i>{user.banner}</i>
              //       </p>


              //     </Card.Footer>
              //   </Card.Body>
              //   <Button
              //     id={user.id}
              //     className="yell-back"
              //     onClick={this._handleInitiateChat}
              //   >
              //     Start Chat
              //   </Button>
              // </Card>
            );
          })}

        </Card.Group>
        {/* </Container> */}
      </div>
    );
  }
}

export default Feed;
