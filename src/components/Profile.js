import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Login from "./Login";
import * as BI from "react-icons/bi/";
//import { NavLink } from "react-router-dom";
import '../styles/Profile.css'

class Myprofile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      bannerMessage: "",
      languages: [],
      userId: "",
      userPic: ""
    };
  }

  componentDidMount = () => {
    fetch(`http://localhost:3001/user/${localStorage.getItem("username")}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user.length !== 0) {
          this.setState({ user: data.user });
          this.setState({ languages: data.user.currentLanguages });
          this.setState({ userId: data.userId });
          this.setState({ userPic: data.pic });
        } else {
          console.log("broken");
        }
      });
  };

  _handleLogout = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  _handleBanner = (e) => {
    e.preventDefault();
    let username = localStorage.getItem("username");
    this.setState({ bannerMessage: e.target.banner.value });
    fetch("https://dev-plat.herokuapp.com/user/" + username, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: e.target.banner.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  
  render() {
    if (!localStorage.getItem("username")) return <Login />;
    let feed = `/feed/${this.state.userId}`;
    
    return (
      <div className="mainProfileSection">
        <Navbar expand="md" collapseOnSelect>
          <Container>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link
                  className="me-5"
                  href={this.state.user.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </Nav.Link>
                <Nav.Link
                  className="me-5"
                  href={this.state.user.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </Nav.Link>
                <Nav.Link
                  className="me-5"
                  href={this.state.user.portfolio}
                  target="_blank"
                  rel="noreferrer"
                >
                  Portfolio
                </Nav.Link>
                <Nav.Link className="me-5" href={feed}>
                  My Feed
                </Nav.Link>
                <Nav.Link className="" onClick={this._handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        
          <Row>
            <Col xs={12} md={5} >
              <div className="picNameLangContainer">
                <img src={this.state.userPic} alt="user profile pic" id="profilePic" />
                <div id="userName">{this.state.user.username}</div>
                <div className="languagesSection mt-3">
                  <div id="languageTitle">My Languages</div>
                  <div className="languages">{this.state.languages[0]}</div>
                  <div className="languages">{this.state.languages[1]}</div>
                  <div className="languages">{this.state.languages[2]}</div>
                </div>
              </div>
          </Col>
          
          <Col xs={11} md={6}>
              <Card id="card-banner">
                <Form onSubmit={this._handleBanner}>
                  <Form.Control
                    as="textarea"
                    placeholder="What's on your mind? What do you want to chat about today?"
                    name="banner"
                    defaultValue={this.state.bannerMessage}
                    className="formTxtArea"
                  />
                  <Button id="chatBtn" type="submit">
                    <BI.BiCommentCheck />
                  </Button>
                </Form>
              </Card>
          </Col>
        </Row>
      </div>
    );}
}

export default Myprofile;
