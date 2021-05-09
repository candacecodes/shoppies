import "./App.css";
import Search from "./Search";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import Nomination from "./Nomination";

const App = () => {
	const API_KEY = "5041fff3";

	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");
	const [title, setTitle] = useState("");
	const [year, setYear] = useState("");
	const [actors, setActors] = useState("");
	const [genre, setGenre] = useState("");
	const [nominations, setNominations] = useState([]);

	const getMovies = async () => {
		const response = await fetch(
			`http://www.omdbapi.com/?t=${search}&apikey=${API_KEY}`
		).then((response) => response.json());
		setMovies(response);
		console.log(movies);
		setTitle(response.Title);
		setYear(response.Year);
		setActors(response.Actors);
		setGenre(response.Genre);
		console.log(nominations.includes(response.Title));
	};

	const addToNominations = () => {
		setNominations((nominations) => [...nominations, title]);
		console.log(nominations);
	};

	const deleteNomination = (nomination) => {
		console.log("delete function for", nomination);
		const results = nominations.filter((nom) => nom != nomination);
		setNominations(results);
		console.log(nominations);
	};

	const displayNominations = () => {
		console.log(nominations);
		return (
			<div>
				{nominations.map((nomination) => (
					<Nomination
						nomination={nomination}
						key={nomination}
						deleteNomination={deleteNomination}
					/>
				))}
			</div>
		);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		getMovies();
	};

	const noNominations = (e) => {
		console.log("no nominations");
		return <p>No nominations currently</p>;
	};

	const alreadyNominated = (e) => {
		console.log("nominated");
		return (
			<button className="add-to-nominations-button">Movie Nominated</button>
		);
	};

	const addNominationButton = (e) => {
		return (
			<button className="add-to-nominations-button" onClick={addToNominations}>
				Nominate Movie
			</button>
		);
	};
	return (
		<>
			<div className="title stars">
				<h3>Welcome to</h3>
				<h1>
					<i>
						<b>The Shoppies</b>
					</i>
				</h1>
				<h2>Movie Awards for Entrepreneurs</h2>
			</div>
			<div className="search">
				<h2>Find Movies</h2>
				<form onSubmit={getSearch}>
					<input
						className="search-bar"
						type="text"
						value={search}
						onChange={updateSearch}
					/>
					<button className="search-button" type="submit">
						Search
					</button>
				</form>
			</div>
			<div className="search stars">
				<h2>Movies</h2>
				{title ? (
					<p>
						Title: {title} <br />{" "}
					</p>
				) : (
					<p>Please Search for Movie</p>
				)}
				{year ? (
					<p>
						Year: {year} <br />{" "}
					</p>
				) : null}
				{actors ? (
					<p>
						Actors: {actors} <br />{" "}
					</p>
				) : null}
				{genre ? (
					<p>
						Genre: {genre} <br />
					</p>
				) : null}

				{nominations.includes(title)
					? alreadyNominated()
					: addNominationButton()}

				<div>
					{nominations.length >= 5 ? (
						<h1>Five Nominations Selected!</h1>
					) : (
						<h2>Current Nominations</h2>
					)}
				</div>
				<div>{nominations.length ? displayNominations() : noNominations()}</div>
			</div>
		</>
	);
};

export default App;
