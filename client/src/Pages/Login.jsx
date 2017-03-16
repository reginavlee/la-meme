import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
//import styles from './styles.module.css'

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button
            bsStyle="primary" 
            onClick={() =>{ this.props.auth.login.bind(this);
            }}
          >
            Login
          </Button> 
        </ButtonToolbar>
      </div>
    );
  }
}

export default Login;
  // static propTypes = {
  //   location: T.object,
  //   auth: T.instanceOf(AuthService)
  // }
