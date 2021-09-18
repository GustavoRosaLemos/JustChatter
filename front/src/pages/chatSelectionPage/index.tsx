import React, { useCallback, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useGetRooms, useRooms } from '../../store/hooks/roomHooks';
import { sendError } from '../../utils/notify';
import './styles.scss';

const chatSelectionPage = (): JSX.Element => {
  const getRooms = useGetRooms();
  const rooms = useRooms();

  const handleSelectChat = () => {
    console.log('entrando no chat!');
  };

  const handleFetchData = useCallback(async () => {
    try {
      await getRooms();
    } catch (error) {
      if (error instanceof Error) {
        sendError(error.message);
      }
    }
    console.log('ROOMS', rooms);
  }, []);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);
  return (
    <Container fluid style={{ marginTop: '20px' }} className="d-flex">
      {rooms &&
        rooms?.map((room) => (
          <Card className="card" key={room._id}>
            <Card.Body>
              <Card.Title>{room.name}</Card.Title>
              <Card.Text>{room.description}</Card.Text>
              <Button variant="primary" onClick={handleSelectChat}>
                Entrar
              </Button>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default chatSelectionPage;
