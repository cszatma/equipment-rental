import React, { Component } from 'react';
import {
  Collapse,
  Navbar as RSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import capitalizeString from '@utils/capitalizeString';

interface Props {
  items: string[];
}

interface State {
  isOpen: boolean;
}

export default class Navbar extends Component<Props, State> {
  public state: Readonly<State> = {
    isOpen: false,
  };

  public toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  public renderItems() {
    return this.props.items.map(item => (
      <NavItem>
        <NavLink className="nav-link" activeClassName="active" to={`/${item}`}>
          {capitalizeString(item)}
        </NavLink>
      </NavItem>
    ));
  }

  public render() {
    return (
      <div>
        <RSNavbar color="dark" dark expand="md" fixed="top" className="">
          <NavbarBrand href="/">Equipment Rental</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {this.renderItems()}
            </Nav>
          </Collapse>
        </RSNavbar>
      </div>
    );
  }
}
