import React, { Component } from 'react';
import { Navbar, Container } from "react-bulma-components/full";
import { Link } from 'react-router-dom';

class MainNavbar extends React.Component {
	render() {
		return(
		<div>
			<Navbar color = 'primary'>
	          <Link to='/'><Navbar.Brand>
	          MindPlus
	          </Navbar.Brand>
	          </Link>

	          <Navbar.Menu>
	            <Navbar.Container position = "left">
	              <Navbar.Item><Link to='/addentry'>Add Journal Entry</Link></Navbar.Item>
	            </Navbar.Container>
	            <Navbar.Container position = "left">
	              <Navbar.Item><Link to='/viewlogs'>View Journal Log</Link></Navbar.Item>
	            </Navbar.Container>
	            <Navbar.Container position = "left">
	              <Navbar.Item>Recommendations</Navbar.Item>
	            </Navbar.Container>
	          </Navbar.Menu>

	        </Navbar>
        </div>
        )
	}
}

export default MainNavbar