import React, { PropTypes as T } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
    console.log(localStorage.getItem('id_token'));
    this.props.auth.login();
  }
  render() {
    return (
      <div>
      <Jumbotron>
        <img src="http://i.imgur.com/79ctaQX.png" alt="la même"/>
        <p>Sign up or log in to continue</p>
        <Button
          bsStyle="primary"
          onClick={this.props.auth.login}
        >
          Login
        </Button>
      </Jumbotron>
      </div>
    );
  }
}

export default Login;
  // static propTypes = {
  //   location: T.object,
  //   auth: T.instanceOf(AuthService)
  // }
