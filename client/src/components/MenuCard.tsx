import React, { FunctionComponent } from 'react';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
}

const MenuCard: FunctionComponent<Props> = ({ title, description }) => (
  <Card className="my-3">
    <CardBody>
      <CardTitle>{title}</CardTitle>
      <CardText>{description}</CardText>
      <Link className="btn btn-primary" to={`/${title.toLowerCase()}`}>
        Go to {title}
      </Link>
    </CardBody>
  </Card>
);

export default MenuCard;
