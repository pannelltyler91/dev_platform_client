import {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import {NavLink} from 'react-router-dom';

class Inbox extends Component {
    constructor() {
        super();
        this.state = {
            chats: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/chat/' + localStorage.getItem('currentUser'))
        .then(res => res.json())
        .then(data => {
            console.log(data.chats);
            this.setState({chats: data.chats}) 
        })
    }
    render() {
        return(
            <div>
                <h1>Inbox</h1>
                <Container>
                {this.state.chats.map((chat) => {
                    return(
                        
                            <Card key={chat.id}>
                               <NavLink to='/chat'><Card.Title>{chat.user2_name}</Card.Title></NavLink> 
                            </Card>
                    )
                })}
                </Container>
            </div>
        )
    }
} 

export default Inbox;