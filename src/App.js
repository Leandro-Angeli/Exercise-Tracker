import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

import Navbar from './components/Navbar';
import ExercisesList from './components/ExercisesList';
import EditExercises from './components/EditExcercises';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

import './App.css';

function App() {
	return (
		<Router>
			<Navbar />
			<hr />
			<Route path="/" exact component={ExercisesList} />
			<Route path="/edit/:id" component={EditExercises} />
			<Route path="/create" component={CreateExercise} />
			<Route path="/user" component={CreateUser} />
		</Router>
	);
}

export default App;
