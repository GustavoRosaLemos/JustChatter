import React from 'react';
import { Col, ListGroup } from 'react-bootstrap';

interface SideListProps {
  items?: string[];
}

const SideList = ({ items }: SideListProps): JSX.Element => (
  <Col style={{ backgroundColor: 'white', overflowY: 'scroll', overflowX: 'hidden' }}>
    <ListGroup>
      <ListGroup.Item action>Gustavo</ListGroup.Item>
      <ListGroup.Item action>Pedro</ListGroup.Item>
      <ListGroup.Item action>João</ListGroup.Item>
      <ListGroup.Item action>Carlos</ListGroup.Item>
      <ListGroup.Item action>Henrique</ListGroup.Item>
    </ListGroup>
  </Col>
);

export default SideList;
