import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const ChatTools = () => (
  <div className="m-2">
    <InputGroup>
      <FormControl placeholder="Escreva..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
      <Button className="btn btn-primary" style={{ height: '50px' }}>
        Enviar
      </Button>
    </InputGroup>
  </div>
);

export default ChatTools;
