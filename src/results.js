import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Axios from 'axios'
let server = require('./config.json').server


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class Results extends React.Component {
	constructor(props) {
		super(props)
		let printEmotion
		let emotion = props.match.params.emotion
		if (emotion === "joy") {
			printEmotion = "happy"
		} else if (emotion === "sadness") {
			printEmotion = "sad"
		} else if (emotion === "anger") {
			printEmotion = "angry"
		} else if (emotion === "fear") {
			printEmotion = "scared"
		}
		this.state = {
			openTab: 0,
            emotion: emotion,
            printEmotion: printEmotion,
            tabs: []
		}
	}

	componentWillMount = async () => {
		let request = `${server}/activities/${this.state.emotion}`
		try {
			let response = await Axios.get(request)
			console.log(response.data)
			this.setState({
				tabs: response.data.tabs,
			})
		} catch (e) {
			console.log("Error, could not find: ", e)
		}
	}

	handleChangeIndex = index => {
    	this.setState({ openTab: index });
 	}

	handleChange = (event, value) => {
		this.setState({
			openTab: value
		})
	}
	render() {
		return (
			<div className="ResultsGradient" style={{minHeight: '90vh', width: '100%'}} >
				<div style={{textAlign: 'center', paddingTop: 20, fontSize: '2.3em',  borderRadius: '8px'}}>
					Based on your journal entry, I think you feel:<br/>
					<span style={{fontSize: '2.2em'}}> {this.state.printEmotion} </span>
				</div>
				<Tabs
		          onChange={this.handleChange}
		          value={this.state.openTab}
        	      variant="scrollable fullWidth"
        	      scrollButtons="on"
		          indicatorColor="primary"
		          textColor="primary"
		          centered
		        >
		          <Tab label={this.state.tabs[0]}/>
		          <Tab label={this.state.tabs[1]} />
		          <Tab label={this.state.tabs[2]} />
		        </Tabs>
		         <SwipeableViews
		          axis={'x'}
		          index={this.state.openTab}
		          onChangeIndex={this.handleChangeIndex}
		        >
		          <TabContainer>Item One</TabContainer>
		          <TabContainer>Item Two</TabContainer>
		          <TabContainer>Item Three</TabContainer>
		        </SwipeableViews>
			</div>
		);
	}
}

export default Results