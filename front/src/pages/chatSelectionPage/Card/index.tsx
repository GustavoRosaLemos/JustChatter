import React from 'react';
import { Card, Button } from 'react-bootstrap';

interface RoomCardProps {
  id: string;
  title: string;
  description: string;
  onClick: (id: string) => unknown;
}

const RoomCard = ({ id, title, description, onClick }: RoomCardProps): JSX.Element => (
  <Card className="card">
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Button variant="primary" onClick={() => onClick(id)}>
        Entrar
      </Button>
    </Card.Body>
  </Card>
);

export default RoomCard;
