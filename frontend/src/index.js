import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/chat';
import WSInstance from './websocket';
import Sigin from './components/sigin';
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null
        }
        this.updateLogin = this.updateLogin.bind(this);
    }
    updateLogin(username) {
        this.setState({
            username: username
        })
    }
    componentDidMount() {
        WSInstance.connect();
    }
    rerenderParentCallback() {
        this.forceUpdate();
    }
    render() {
        console.log(this.state);
        console.log("Render");
        return(
            <div>
                {(this.state.username != null) ? <Chat username={this.state.username} />  : <Sigin updateLogin={this.updateLogin} />}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));