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
      <Form onSubmit={this.handleSubmit}>
        <FormGroup bsSize="large">
          <InputGroup>
            <FormControl
              onChange={this.handleInputChange}
              value={this.state.value}
              type="text"
              placeholder="..."
            />
            <OverlayTrigger placement="right" overlay={tooltip}>
              <DropdownButton
                bsStyle="primary"
                bsSize="large"
                componentClass={InputGroup.Button}
                id="meme-input-dropdown"
                title="Actions"
              >
                <MenuItem key="3">Clear</MenuItem>
                <MenuItem key="1">Save</MenuItem>
                <MenuItem key="2">Quit</MenuItem>
              </DropdownButton>
            </OverlayTrigger>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

export default GameInput;
