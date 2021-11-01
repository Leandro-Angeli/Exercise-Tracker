import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);
		this.onChangeUserName = this.onChangeUserName.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.userInput = React.createRef();

		this.state = {
			username: '',
		};
	}

	onChangeUserName(e) {
		this.setState({
			username: e.target.value,
		});
	}
	onSubmit(e) {
		e.preventDefault();
		const user = {
			username: this.state.username,
		};
		console.log(user);
		axios
			.post('http://localhost:5000/users/add', user)
			.then((res) => console.log(res.data));
		this.setState({
			username: '',
		});
	}

	render() {
		return (
			<div>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label type="text">Username:</label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUserName}
						></input>
					</div>
					<div className="form-group">
						<button
							type="submit"
							value="Create User"
							className="btn btn-primary"
						>
							Create User
						</button>
					</div>
				</form>
			</div>
		);
	}
}
