import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Axios from 'axios'

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
		let emotion = props.match.params.emotion
		if (emotion === "joy") {
			emotion = "happy"
		} else if (emotion === "sadness") {
			emotion = "sad"
		} else if (emotion === "anger") {
			emotion = "angry"
		} else if (emotion === "fear") {
			emotion = "scared"
		}
		this.state = {
			openTab: 0,
            emotion: emotion
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
					<span style={{fontSize: '2.2em'}}> {this.state.emotion} </span>
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
		          <Tab label="Funny videos!" />
		          <Tab label="Comfort Restaurants" />
		          <Tab label="Sad music" />
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