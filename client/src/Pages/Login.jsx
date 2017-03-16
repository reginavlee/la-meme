import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../../utils/AuthService'
//import styles from './styles.module.css'

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor(props) {
    super(props)
    this.state = {
      auth: new AuthService('KhDTuf4lq48s3Db6kEvHHaLGaQCb7ETk', 'lameme.auth0.com')
    }
    console.log(this.state.auth)
  }

  render() {
    const { auth } = this.props
    return (
      <div>
        <h2>Login</h2>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={this.state.auth.login.bind(this)}>Login</Button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;