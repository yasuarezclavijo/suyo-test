import React from 'React';
import WSInstance from '../websocket';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {messages:[]};
        this.username = props.username
        this.waitForSocketConnection(() => {
            WSInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this)
            );
            WSInstance.fetchMessages(this.username);
        });
    }
    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function(){
                if (WSInstance.state() === 1) {
                    console.log("Conexion establecida");
                    callback();
                    return;
                } else {
                    console.log("Esperando conexion...");
                    component.waitForSocketConnection(callback);
                }
            }
        ,100);
    }
    setMessages(messages) {
        this.setState({messages: messages});
    }
    addMessage(message) {
        console.log(message);
        this.setState({messages: [...this.state.messages, message]});
    }
    timeConvert(datetime) {
        let today = new Date();
        let dateConvert = new Date(datetime);
        return dateConvert.toLocaleTimeString();
    }
    renderMessages(messages) {
        const currentUser = this.username;
        return messages.map(message => (
            <div  key={message.id}>
            {message.author != currentUser ? (
                <div className="d-flex justify-content-start mb-4">
                    <div className="msg_cotainer">
                    <   span className="msg_name">{message.author}</span>
                        {message.content}
                        <span className="msg_time">{this.timeConvert(message.timestamp)}</span>
                    </div>
                </div>
            ):(
                <div className="d-flex justify-content-end mb-4" key={message.id}>
                    <div className="msg_cotainer_send">
                        <span className="msg_name">{message.author}</span>
                        {message.content}
                        <span className="msg_time">{this.timeConvert(message.timestamp)}</span>
                    </div>
                </div>
            )}
            </div>
        ));
    }
    sendNewMessage = e => {
        e.preventDefault();
        const messageObject = {
            from: this.username,
            content: this.state.message
        }
        WSInstance.newChatMessage(messageObject);
        this.setState({
            newMessage: ''
        })
    }
    messageCapture = e => {
        this.setState({
            message: e.target.value
        })
    }
    render() {
        const messages = this.state.messages;
        return (
            <div className="col-md-12 col-xl-12 chat">
                <div className="card">
                    <div className="card-header msg_head">
                        <div className="d-flex bd-highlight">
                            <div className="user_info">
                                <span>Chat test for SUYO S.A.</span>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body msg_card_body msg_card_body" ref={(el) => { this.messagesEnd = el; }}>
                    { messages && this.renderMessages(messages)}
                    </div>
                    <div className="card-footer">
                        <form onSubmit={this.sendNewMessage}>
                            <div className="input-group">
                                <textarea name="" 
                                onChange={this.messageCapture}
                                value={this.state.newMessage}
                                className="form-control type_msg" 
                                placeholder="Type your message..."></textarea>
                                <div className="input-group-append">
                                    <button type="submit" className="input-group-text send_btn"><i className="fas fa-location-arrow"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}