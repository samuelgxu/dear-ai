import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

let server = require('./config.json').server


const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: '1em',
  },
  pos: {
    marginBottom: 12,
  },
};


function TabContainer(props) {
  return (
    <Typography component="div" style={{}}>
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
			this.setState({
				tabs: response.data.tabs,
				info: response.data.data
			}, () => {
				console.log(this.state)
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

	makeCard = (info, title) => {
	    return (
	      <Card className={styles.card} elevation={2} style={{width: 350, margin: 10}}>
	        <CardContent style={{padding: 0}}>
	          <CardMedia
		          image={info.image_url}
		          title="Paella dish"
		          style={{height: 280}}
		        />
	          <Typography style={{ textAlign: 'left', fontSize: '2em', padding: 10, color: '#4B4B4B'}}>
	            <a href={info.url}>{info.name}</a>
	          </Typography>
	        </CardContent>
	      </Card>
	    )
	  }

	render() {
		if (this.state.tabs.length === 0) {
			return (
				<div>
				Loading...
				</div>
			)
		} else {
			return (
				<div className="ResultsGradient" style={{minHeight: '90vh', width: '100%'}} >
					<div style={{textAlign: 'center', paddingTop: 20, fontSize: '2.3em',  borderRadius: '8px'}}>
						Based on your journal entry, I think you feel:<br/>
						<span style={{fontSize: '2.2em'}}> {this.state.printEmotion} </span>
					</div>
					<div>
						<Tabs
				          onChange={this.handleChange}
				          value={this.state.openTab}
		        	      variant="fullWidth"
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
				          onChangeIndex={this.handleChangeIndex}>
				          <TabContainer>{
				          	<div style={{paddingTop: 20, paddingLeft: 20}}>
				              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', padding: 8}}>
				                {
				                  this.state.info[0].map((info) => this.makeCard(info, this.state.tabs[0]))
				                }
				              </div>
				          	</div>
				          }</TabContainer>
				          <TabContainer>
				        	<div style={{paddingTop: 20, paddingLeft: 20}}>
				              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', padding: 8}}>
				                {
				                  this.state.info[1].map((info) => this.makeCard(info, this.state.tabs[1]))
				                }
				              </div>
				          	</div>
				          </TabContainer>
				          <TabContainer>{
				          	<div style={{paddingTop: 20, paddingLeft: 20}}>
				              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', padding: 8}}>
				                {
				                  this.state.info[2].map((info) => this.makeCard(info, this.state.tabs[2]))
				                }
				              </div>
				          	</div>
				          }</TabContainer>
				        </SwipeableViews> 
			        </div>
		        </div>
			)
		}
	}
}

export default Results