import React, { Component } from 'react';
import { Navbar, Container } from "react-bulma-components/full";
import { Link } from 'react-router-dom';
import "./gradients.css"

class MainNavbar extends React.Component {
	render() {
		return (
		<div>
			<Navbar style={{}}>
          	  <Link to='/' style={{color: 'black'}}><span style={{fontSize: '4em', margin: '1vw', textColor: 'black'}}>Mind <span style={{color: 'red'}}>AI</span>D</span></Link>

	          <Navbar.Menu style={{position: 'absolute', right: 0, bottom: 0, margin: 10}}>
	              <Navbar.Item><span style={{fontSize: '1.2em', marginLeft: '10'}}><Link to='/addentry' style={{color: 'black'}}>Add Journal Entry</Link></span></Navbar.Item>
	              <Navbar.Item><span style={{fontSize: '1.2em', marginLeft: '10'}}><Link to='/viewlogs' style={{color: 'black'}}>View Journal Log</Link></span></Navbar.Item>
	          </Navbar.Menu>

	        </Navbar>
        </div>
        )
	}
}

export default MainNavbar