import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import './styles.scss';

const chatSelectionPage = (): JSX.Element => (
  <Container fluid style={{ marginTop: '20px' }} className="d-flex">
    <Card className="card">
      <Card.Body>
        <Card.Title>DEV Fullstack</Card.Title>
        <Card.Text>
          Sala destinada a desenvolvedores fullstack, com o intuito de incentivar a troca de conhecimentos.
        </Card.Text>
        <Button variant="primary">Entrar</Button>
      </Card.Body>
    </Card>
    <Card className="card">
      <Card.Body>
        <Card.Title>DEV Front</Card.Title>
        <Card.Text>
          Sala destinada a desenvolvedores front-end, com o intuito de incentivar a troca de conhecimentos.
        </Card.Text>
        <Button variant="primary">Entrar</Button>
      </Card.Body>
    </Card>
    <Card className="card">
      <Card.Body>
        <Card.Title>DEV Back</Card.Title>
        <Card.Text>
          Sala destinada a desenvolvedores back-end, com o intuito de incentivar a troca de conhecimentos.
        </Card.Text>
        <Button variant="primary">Entrar</Button>
      </Card.Body>
    </Card>
  </Container>
);

export default chatSelectionPage;
