import React from 'react';
import { Col } from 'react-bootstrap';
import Chat from './Chat';
import SideList from '../../shared/components/SideList';
import ChatTools from './ChatTools';

const chatPage = () => {
  return (
    <Col style={{ height: '92.5vh' }}>
      <div className="d-flex justify-content-between" style={{ height: '100%' }}>
        <div className="d-flex flex-column justify-content-between col-md-10" style={{ backgroundColor: '#F7F7F7' }}>
          <div style={{ height: '100%', maxHeight: '83vh' }}>
            <Chat />
          </div>
          <div style={{ height: '10%' }}>
            <ChatTools />
          </div>
        </div>
        <div className="d-flex justify-content-center sideListBox" style={{ width: '100%' }}>
          <SideList />
        </div>
      </div>
    </Col>
  );
};

export default chatPage;
