import React, { Component } from 'react';
import { Button, Hero, Section, Container, Heading, Columns } from "react-bulma-components/full";
import { Link } from 'react-router-dom';


class Results extends React.Component {
	render() {
		return (
			<div class="container">
				<Section>
			        <Hero color="info">
			          <Hero.Body>
			            <Container>
			              <Heading size = {1}>Thanks for your entry!</Heading>
			              <Heading subtitle size={2}>
			                Based on your journal input, you feel
			              </Heading>
			            </Container>
			          </Hero.Body>
			        </Hero>
			      </Section>

			      <Container color>
				      <Columns>
				      	<Columns.Column size = "auto">
				      		<Heading size = {1}>Angry</Heading>
				      	</Columns.Column>
				      	<Columns.Column size = "auto">
				      		<Heading size = {1}>&</Heading>
				      	</Columns.Column>
				      	<Columns.Column size = "auto">
							<Heading size = {1}>Sad</Heading>
				      	</Columns.Column>
				      </Columns>
			      </Container>

			      <Section>
			        <Hero color="warning">
			          <Hero.Body>
			            <Container>
			              <Heading size = {1}>Because of your mood, we recommend</Heading>			              
			            </Container>
			          </Hero.Body>
			        </Hero>
			      </Section>
			</div>
		);
	}
}

export default Results