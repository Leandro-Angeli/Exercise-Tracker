import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Exercise = (props) => {
	return (
		<tr>
			<td>{props.exercise.username}</td>
			<td>{props.exercise.description}</td>
			<td>{props.exercise.duration}</td>
			<td>{props.exercise.date.substring(0, 10)}</td>

			<td>
				<Link className="btn btn-info" to={`/edit/${props.exercise._id}`}>
					edit
				</Link>
				<button
					className="btn btn-danger"
					href="#"
					onClick={() => {
						props.deleteExercise(props.exercise._id);
					}}
				>
					delete
				</button>
			</td>
		</tr>
	);
};

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);
		this.deleteExercise = this.deleteExercise.bind(this);
		this.state = { exercises: [] };
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/exercises/')
			.then((response) => {
				this.setState({ exercises: response.data });
			})
			.catch((error) => {
				console.log(error);
			});
	}

	exerciseList() {
		return this.state.exercises.map((currentexercise) => {
			return (
				<Exercise
					exercise={currentexercise}
					deleteExercise={this.deleteExercise}
					key={currentexercise._id}
				></Exercise>
			);
		});
	}

	deleteExercise(id) {
		axios
			.delete('http://localhost:5000/exercises/' + id)
			.then((res) => console.log(res.data));
		this.setState({
			exercises: this.state.exercises.filter((el) => el._id !== id),
		});
	}

	render() {
		// ANOTHER OF DOING IT CREATING CONST FROM THIS.STATE
		// const { exercises } = this.state;
		// console.log(
		// 	this.state.exercises.map((currentexercise) => currentexercise._id)
		// );
		// /* <div>
		// {exercises.map(exercise=><div key={exercise._id}>{exercise.duration}</div>)

		// }</div> */
		// {/* <div>
		// 			{this.state.exercises.map((exercise) => (
		// 				<div>{exercise.duration}</div>
		// 			))}
		// 		</div> */}
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
