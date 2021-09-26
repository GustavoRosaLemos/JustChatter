import React, { useState } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import { ChatUser } from '../../../shared/@types/chat';
import { ModalDisplayBody } from '../../../shared/@types/modal';
import ModalDisplay from '../../../shared/components/ModalDisplay';

interface SideListProps {
  users: ChatUser[];
}

const SideList = ({ users }: SideListProps): JSX.Element => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState<ModalDisplayBody[]>([]);
  const [show, setShow] = useState(false);

  const handleCloseModal = () => {
    setShow(false);
  };

  const handleDisplayModal = (title: string, body: ModalDisplayBody[]) => {
    setTitle(title);
    setBody(body);
    setShow(true);
  };
  return (
    <Col style={{ backgroundColor: 'white', overflowY: 'scroll', overflowX: 'hidden' }}>
      <ListGroup>
        {users &&
          users.map((user) => (
            <ListGroup.Item
              key={user.sid}
              action
              onClick={() => {
                handleDisplayModal(user.user.username, [
                  { title: 'Nome', value: user.user.name },
                  { title: 'Email', value: user.user.email },
                ]);
              }}
            >
              {user.user.username}
            </ListGroup.Item>
          ))}
      </ListGroup>
      <ModalDisplay title={title} body={body} show={show} onClose={handleCloseModal} />
    </Col>
  );
};

export default SideList;
