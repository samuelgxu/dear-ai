import React, { Component } from 'react';
import { Button } from "react-bulma-components/full";
import { Link } from 'react-router-dom';


class AddEntry extends React.Component {
	render() {
		return (
			<div class="container">
				<div class="field">
					<label class="label">Input Journal Entry</label>
					<div class="control">
						<textarea class="textarea" placeholder="Input Journal Entry Here"></textarea>
					</div>
				</div>
				<div class="control">
    				<Link to = "/results"><Button color = "primary">Submit</Button></Link>
  				</div>
			</div>
		);
	}
}

export default AddEntry