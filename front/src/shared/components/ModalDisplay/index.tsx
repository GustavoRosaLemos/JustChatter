import React from 'react';
import { Modal, CloseButton } from 'react-bootstrap';
import { ModalDisplayBody } from '../../@types/modal';
import { v4 as uuidv4 } from 'uuid';

interface ModalDisplayProps {
  title: string;
  body: ModalDisplayBody[];
  show: boolean;
  onClose: () => void;
}

const ModalDisplay = ({ title, body, show, onClose }: ModalDisplayProps): JSX.Element => (
  <Modal show={show} onHide={onClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {body.map((item) => (
        <p key={uuidv4()}>
          <b>{item.title}</b>: {item.value}{' '}
        </p>
      ))}
    </Modal.Body>
  </Modal>
);

export default ModalDisplay;
