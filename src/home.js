import React, { Component } from 'react';
import { Section, Hero, Container, Heading, Columns, Button } from "react-bulma-components/full";
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
	render() {
		return(
			<div>
				<Section>
				  <Hero color="warning">
				    <Hero.Body>
				      <Container>
				        <Heading> Welcome to Mind AID</Heading>
				        <Heading subtitle size = {3}>
				          We use machine learning to recommend you activities through journaling so you can stay positive.
				        </Heading>
				      </Container>
				    </Hero.Body>
				  </Hero>
				</Section>

				<div>

				  <Columns>
				    <Columns.Column size = "third">
				      <Link to = "/addentry"><Button color = "light"> Add Journal Entry</Button></Link>
				    </Columns.Column>
				    <Columns.Column size = "third">
				      <Link to = "/viewlogs"><Button color = "light"> View Journal Log</Button></Link>
				    </Columns.Column>
				    <Columns.Column size = "third">
				      <Button color = "light"> See Recommendations</Button>
				    </Columns.Column>
				  </Columns>

				</div>
			</div>
		)
	}
}

export default HomePage