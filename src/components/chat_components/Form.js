import { Component } from "react";


class Form extends Component {
    constructor(){
        super()
        this.state = {

        }
    }
    _sendMessage = (e) => { 
        e.preventDefault()
        console.log(e.target.message.value);
        const data = {message: e.target.message.value, chatId: this.props.chatId}
        console.log(data.chatId)
        fetch(`http://localhost:3001/message/${localStorage.getItem('currentUser')}`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data.message);
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this._sendMessage}> 
                    <input type="text" name="message" id="message"/> 
                    <button type="submit">send </button>
                </form>
            </div>
        )
    }
}

export default Form;