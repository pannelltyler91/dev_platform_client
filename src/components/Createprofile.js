import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Known from "./Known";
import Tolearn from "./Tolearn";
import Links from './Links';
//import minify from 'url-minify';
//import { nanoid } from 'nanoid';

const Createprofile = () => {
  const [created, setCreated] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const history = useHistory();

  //Converts User Img to URL and Store in State Variable
  const _handlePicUpload = (e) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setProfilePic(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  };



  const _handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e);
    const knownCheckBoxes = document.getElementsByClassName("form-check-input");
    let knownChecked = [];
    let toLearnChecked = [];
    for (let i = 0; i < knownCheckBoxes.length; i++) {
      if (
        knownCheckBoxes[i].checked &&
        knownCheckBoxes[i].parentElement.parentElement.parentElement.id ===
          "known"
      ) {
        // console.log({name:knownCheckBoxes[i].name,message:'This is a known language'})
        knownChecked.push(knownCheckBoxes[i].name);
      }
      if (
        knownCheckBoxes[i].checked &&
        knownCheckBoxes[i].parentElement.parentElement.parentElement.id ===
          "toLearn"
      ) {
        // console.log({name:knownCheckBoxes[i].name,message:'This is a language to learn'})
        toLearnChecked.push(knownCheckBoxes[i].name);
      }
    }

    const data = {
      github: e.target.github.value,
      linkedin: e.target.linkedin.value,
      portfolio: e.target.portfolio.value,
      knownLanguages: knownChecked,
      toLearn: toLearnChecked,
      userImg: profilePic,
    };

    //localStorage.setItem('profilePic', e.target.pic.value)

    localStorage.setItem("profilePic", e.target.pic.value);

    //console.log(e.target.pic.value);
    if (knownChecked.length > 3 || toLearnChecked.length > 3) {
      alert("Please limit language selections to 3 or less.");
    } else {
      fetch(
        `http://localhost:3001/user/${localStorage.getItem(
          "username"
        )}/profile/create`,
        {
          method: "PUT", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.update) {
            setCreated(true);
            console.log(created);
            let theUserId = data.userId;
            history.push(`/profile/${theUserId}`);
          }
        });
    }
  };

  /*  if(created){
      return(
          <Redirect to='/profile' />
      )
  } */

  return (
    <div>
      <h1>Create Profile</h1>

      <p>
        Now that you have signed up. Let's create your profile and get you
        connected!
      </p>

      <Container>
        <Card bg="info">{/*make a component */}
          <p>Make sure to include https:// or http:// with links</p>
          <Form onSubmit={_handleSubmit} encType="multipart/form-data"> 
            <Links /> {/* Type Links for Github, LinkedIn & Portfolio */}
            <Known />  {/* Languages you know */}
            <Tolearn />   {/* Languages you want to learn */}

            <Card style={{ margin: "5px" }} bg="light">
              <Form.Group>
                <Form.Label>Upload Profile Picture:</Form.Label>
                <Form.Control
                  name="pic"
                  type="file"
                  onChange={_handlePicUpload}
                />
              </Form.Group>
            </Card>
            
            <Button variant="light" type="submit">
              Create Profile
            </Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Createprofile;
