import React from 'React';

export default class Sigin extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {login: ''};
        this.updateLogin = props.updateLogin;
    }
    handleSubmit(event) {
        event.preventDefault();
        this.setState({login: event.target.value});
        this.updateLogin(this.state.login);
    }
    handleChange(event) {
        this.setState({login: event.target.value});
    }
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <label>
                                Username:
                                <input type="text" className="form-control"  value={this.state.login} onChange={this.handleChange} />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-success">Entrar</button>
                    </form>
                </div>
            </div>
        );
      
    }
}

