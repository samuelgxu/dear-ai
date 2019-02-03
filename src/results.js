import React, { Component } from 'react';
import { Button, Hero, Section, Container, Heading, Columns } from "react-bulma-components/full";
import { Link } from 'react-router-dom';

class Results extends React.Component {
	render() {
		return (
			<div class="container">
				<div>
					<div style={{marginTop: 10, fontSize: '2em', backgroundColor: 'light-blue'}}>
						Based on your journal entry, I think you feel:<br/>
						<span style={{fontSize: '2.2em'}}> happy </span>
						and a little 
						<span style={{fontSize: '2.2em'}}> scared </span> 
					</div>
				</div>
			</div>
		);
	}
}

export default Results