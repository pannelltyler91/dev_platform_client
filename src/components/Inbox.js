import {Component} from 'react';

class Inbox extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount = () => {
        fetch('http://localhost:3001/chat/' + localStorage.getItem('currentUser'))
        .then(res => res.json())
        .then(data => {
            console.log(data.chats);
        })
    }
    render() {
        return(
            <div>
                <h1>Test Inbox</h1>
            </div>
        )
    }
} 

export default Inbox;