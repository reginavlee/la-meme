import React, { Component } from 'react';
import { Form, FormGroup, FormControl, InputGroup, DropdownButton, MenuItem, OverlayTrigger, Tooltip, ButtonToolbar, Button } from 'react-bootstrap';

const tooltip = (
  <Tooltip id="tooltip">Game Commands!</Tooltip>
);

class GameInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
      value: ''
    });
    this.props.setGameInput(message)
  }
  render() {
    return (
    <div>
      <Form>
        <FormGroup bsSize="large" className="inputArea">
          <InputGroup>
            <FormControl 
              componentClass="textarea"
              onChange={this.handleInputChange}
              value={this.state.value}
              type="text"
              rows="2"
              placeholder="Enter your caption"
            />
          </InputGroup>
          <ButtonToolbar>
            <Button bsStyle="default" bsSize="large" onClick={this.handleSubmit.bind(this)}>Submit</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
      </div>
    );
  }
}

export default GameInput;
