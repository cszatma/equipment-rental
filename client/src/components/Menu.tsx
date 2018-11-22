import React, { FunctionComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import MenuCard from '@components/MenuCard';

const choices = [
  { title: 'Create', description: 'Create tables.' },
  { title: 'Delete', description: 'Drop tables.' },
  { title: 'Populate', description: 'Populate the tables with data.' },
  { title: 'Query', description: 'Run queries on the tables.' },
];

const Menu: FunctionComponent<{}> = () => (
  <Container>
    <h1>Main</h1>
    <Container className="py-3">
      <Row>
        {choices.map(choice => (
          <Col xs="12" md="6">
            <MenuCard title={choice.title} description={choice.description} />
          </Col>
        ))}
      </Row>
    </Container>
  </Container>
);

export default Menu;
