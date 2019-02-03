import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Navbar, Section, Hero, Container, Heading, Columns } from "react-bulma-components/full";


class App extends Component {
  render() {
    return (
      <div className="App">

        <Navbar color = 'primary'>
          <Navbar.Brand>
          MindPlus
          </Navbar.Brand>

          <Navbar.Menu>
            <Navbar.Container position = "left">
              <Navbar.Item>Add Journal Entry</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container position = "left">
              <Navbar.Item>View Journal Log</Navbar.Item>
            </Navbar.Container>
          </Navbar.Menu>

        </Navbar>

        <Section>
          <Hero color="warning">
            <Hero.Body>
              <Container>
                <Heading> Welcome to MAIndfulLife</Heading>
                <Heading subtitle size = {3}>
                  We use machine learning to recommend you activities through journaling so you can stay positive.
                </Heading>
              </Container>
            </Hero.Body>
          </Hero>
        </Section>

        <div>

          <Columns>
            <Columns.Column size = "half">
              <Button color = "light"> Add Journal Entry</Button>
            </Columns.Column>
            <Columns.Column size = "half">
              <Button color = "light"> View Journal Log</Button>
            </Columns.Column>
          </Columns>

        </div>

      </div>
      );
  }
}

export default App;
