/* eslint-disable no-console */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Axios from 'axios'

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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

let responseColors = {
  fear: '#FFFED2',
  anger: '#FFE9D2',
  sadness: '#D2FEFF',
  joy: '#D2FFD5',
}

class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      logData: undefined
    }
  }

  componentWillMount = async () => {
    let request = `${server}/log`
    try {
      let response = await Axios.get(request)
      this.setState({
        logData: response.data
      })
    } catch (err) {
      throw err
    }
  }

  makeCard = (dayInfo) => {
    return (
      <Card className={styles.card} elevation={2} style={{marginTop: 10, width: 280, minHeight: 300, margin: 10, backgroundColor: responseColors[dayInfo.response]}}>
        <CardContent>
          <Typography className={styles.title} style={{fontSize: '1.2em'}} color="textSecondary" gutterBottom>
            {dayInfo.date}
          </Typography>
          <Typography style={{ textAlign: 'left', fontSize: '2em', color: '#4B4B4B'}}>
            {dayInfo.message}
          </Typography>
        </CardContent>
      </Card>
    )
  }

  render() {
    if (this.state.logData == undefined) {
      return <div style={{paddingTop: 30}}>Loading...</div>
    } else {
      return (
        <div className="LogGradient" style={{minHeight: '100vh'}}>
          <br/><span style={{fontSize: '2em', paddingTop: 30}}>Take a look at your previous log entries</span>
          <div style={{paddingTop: 20, paddingLeft: 20}}>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row', padding: 8}}>
                {
                  this.state.logData.map(this.makeCard)
                }
              </div>
            
          </div>
        </div>
      )
    }
  }
}

export default HomePage