import React, { PropTypes as T } from 'react';
import { Button } from 'react-bootstrap';

const doneCallback = (cb) => {
  cb();
}

export class Login extends React.Component {
  constructor(props) {
    super(props);

    console.log(this.props.auth.getToken());
  }
  componentDidMount() {
    console.log(this.props);
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
