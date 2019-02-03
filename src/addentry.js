import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import "./gradients.css"

class AddEntry extends React.Component {
	render() {
		return (
			<div className="EntryGradient">
				<div style={{fontSize: '3em', paddingTop: '10vh', color: '#333333'}}>How are you feeling?</div>
				<div style={{fontSize: '2.2em', color: '#333333'}}>What happened today?</div>
				<TextField
		          id="standard-multiline-flexible"
		          label="Tell me how it went!"
		          style={{minWidth: '60vw', minHeight: '40vh'}}
		          multiline
 				  inputProps={{
				    style: {
				    	fontSize: '2em',
				    	lineHeight: '1.5em'
				    } 
			      }}
		          rows="4"
		          hint="Tell me how it went.."
		          margin="normal"
		        /><br/>
				<Link to='/results'><Button 
					variant="filled" 
					color="primary"
					style={{minHeight: '10vh', minWidth: '30vh', fontSize: '1.5em'}} 
					size="large">Save</Button>
				</Link>
			</div>
		);
	}
}

export default AddEntry