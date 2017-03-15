import React from 'react';
import { Alert } from 'react-bootstrap';

const NewUserJoined = () => {
  return (
    <Alert bsStyle="success">
      <strong> a new user has joined the lobby </strong>
    </Alert>
  );
};

export default NewUserJoined;
