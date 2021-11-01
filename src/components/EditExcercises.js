import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercises extends Component {
	constructor(props) {
		super(props);
		this.onChangeUserName = this.onChangeUserName.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.userInput = React.createRef();

		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:5000/exercises/' + this.props.match.params.id)
			.then((response) => {
				this.setState({
					username: response.data.username,
					description: response.data.description,
					duration: response.data.duration,
					date: new Date(response.data.date),
				});
			})
			.catch((err) => {
				console.log(err);
			});
		axios.get('http://localhost:5000/users/').then((response) => {
			if (response.data.length > 0) {
				this.setState({
					users: response.data.map((user) => user.username),
				});
			}
		});
	}

	onChangeUserName(e) {
		this.setState({
			username: e.target.value,
		});
	}
	onChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}
	onChangeDuration(e) {
		this.setState({
			duration: e.target.value,
		});
	}
	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};
		console.log(exercise);

		axios
			.post(
				'http://localhost:5000/exercises/update/' + this.props.match.params.id,
				exercise
			)
			.then((res) => console.log(res.data));
		setTimeout(() => {
			window.location = '/';
		}, 1000);
	}
	render() {
		return (
			<div>
				<h3>Edit Excercise Log</h3>

				<form onSubmit={this.onSubmit}>
					<label>Usename:</label>
					<select
						ref={this.userInput}
						// ref="userInput"
						required
						className="form-select"
						value={this.state.username}
						onChange={this.onChangeUserName}
					>
						{this.state.users.map((user) => {
							return (
								<option key={user} value={user}>
									{user}
								</option>
							);
						})}
					</select>
					<div className="form-group">
						<label>Description:</label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.description}
							onChange={this.onChangeDescription}
						></input>
					</div>
					<div className="form-group">
						<label>Duration (in minutes):</label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.duration}
							onChange={this.onChangeDuration}
						></input>
					</div>
					<div className="form-group">
						<label>Date:</label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}
							></DatePicker>
						</div>
					</div>
					<div className="form-group">
						<button
							type="submit"
							value="Create Exercise Log"
							className="btn btn-primary"
						>
							Edit Exercise Log
						</button>
					</div>
				</form>
			</div>
		);
	}
}
