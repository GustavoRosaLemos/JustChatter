import React, { useCallback, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import RoomCard from './Card';
import { useHideLoading, useIsLoading, useShowLoading } from '../../store/hooks/loadingHooks';
import { useGetRooms, useRooms } from '../../store/hooks/roomHooks';
import ClipLoader from 'react-spinners/ClipLoader';
import { sendError } from '../../utils/notify';
import './styles.scss';
import history from '../../shared/history';

const chatSelectionPage = (): JSX.Element => {
  const isLoading = useIsLoading();
  const showLoading = useShowLoading();
  const hideLoading = useHideLoading();
  const getRooms = useGetRooms();
  const rooms = useRooms();

  const handleSelectChat = (roomId: string) => {
    history.push(`/chat/${roomId}`);
  };

  const handleFetchData = useCallback(async () => {
    try {
      await getRooms();
    } catch (error) {
      if (error instanceof Error) {
        sendError(error.message);
      }
    } finally {
      hideLoading();
    }
  }, []);

  useEffect(() => {
    showLoading();
    handleFetchData();
  }, [handleFetchData]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ marginTop: '30vh' }}>
        <ClipLoader color="#0d6efd" loading={isLoading} size={100} speedMultiplier={0.5} />
      </div>
    );
  }

  return (
    <Container fluid style={{ marginTop: '20px' }} className="d-flex justify-content-center">
      {rooms ? (
        rooms.map((room) => (
          <RoomCard
            key={room._id}
            id={room._id}
            title={room.name}
            description={room.description}
            onClick={handleSelectChat}
          />
        ))
      ) : (
        <div>Não há salas!</div>
      )}
    </Container>
  );
};

export default chatSelectionPage;
