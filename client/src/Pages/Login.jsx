import React, { PropTypes as T } from 'react';
import { Button } from 'react-bootstrap';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <Button
          bsStyle="primary"
          onClick={this.props.auth.login}
        >
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
  // static propTypes = {
  //   location: T.object,
  //   auth: T.instanceOf(AuthService)
  // }
