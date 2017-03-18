import React, { Component } from 'react';
import { Form, FormGroup, FormControl, InputGroup, DropdownButton, MenuItem, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
      value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const message = this.state.value;
    this.props.handleMessage(message);
    this.setState({
      value: ''
    });
  }
  render() {
    return (
      <Form>
        <FormGroup bsSize="large" className="inputArea">
          <InputGroup>
            <FormControl 
              componentClass="textarea"
              onChange={this.handleInputChange}
              value={this.state.value}
              type="text"
              rows="2"
              placeholder="..."
            />
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default GameInput;
