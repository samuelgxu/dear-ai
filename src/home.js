import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "./App.js"
import "./gradients.css"

class HomePage extends React.Component {
	render() {
		return (
			<div className="HomeGradient" style={{minHeight: '90vh'}}>
				<div style={{fontSize: "4em", width: '100%', paddingTop: '8vh'}}>
					Welcome to <span style={{color: '#DE5151'}}>Dear</span><span style={{color: '#93C5CB'}}>AI</span>
				</div>
				<div style={{fontSize: '2em', width: '100%'}}>
					We use machine learning to improve your lifestyle and wellbeing</div>
				<Link to='/addentry'><Button 
					variant="outlined" 
					color="primary"
					style={{marginTop: "20vh", minHeight: '10vh', minWidth: '30vh', fontSize: '1.5em'}} 
					size="large">Get started</Button>
				</Link>
			</div>
		)
	}
}

export default HomePage