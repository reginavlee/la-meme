import React, { Component } from 'react';
import { Form, FormGroup, FormControl, InputGroup, DropdownButton, MenuItem, OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap';

const tooltip = (
  <Tooltip id="tooltip">Game Commands!</Tooltip>
);

class GameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      memeText: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange(e) {
    const value = e.target.value;
    this.setState({
      value: value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const message = this.state.value;
    this.setState({
      memeText: message,
      value: ''
    });
    this.props.setGameInput(message)
  }
  render() {
    return (
    <div>
      <Form onSubmit={this.handleSubmit}>
        <FormGroup bsSize="large" className="inputArea">
          <InputGroup>
            <FormControl
              onChange={this.handleInputChange}
              value={this.state.value}
              memeText={this.state.memeText}
              type="text"
              placeholder="Enter your caption"
            />
          </InputGroup>
          <ButtonToolbar>
            <Button bsStyle="default" type="submit" bsSize="large">Submit</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default GameInput;
