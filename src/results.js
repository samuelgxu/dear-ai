import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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

		this.state = {
			openTab: 0,
            emotion: props.match.params.emotion
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
			<div className="container">
				<div style={{textAlign: 'center'}}>
					<div style={{marginTop: 10, fontSize: '2.3em', backgroundColor: '#ADE4EE', borderRadius: '8px', width: '80vw'}}>
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
			</div>
		);
	}
}

export default Results