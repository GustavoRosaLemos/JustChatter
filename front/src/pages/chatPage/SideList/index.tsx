import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { ChatUser } from '../../../shared/@types/chat';

interface SideListProps {
  users: ChatUser[];
}

const SideList = ({ users }: SideListProps): JSX.Element => (
  <Col style={{ backgroundColor: 'white', overflowY: 'scroll', overflowX: 'hidden' }}>
    <ListGroup>
      {users &&
        users.map((user) => (
          <ListGroup.Item key={user.sid} action>
            {user.user.username}
          </ListGroup.Item>
        ))}
    </ListGroup>
  </Col>
);

export default SideList;
