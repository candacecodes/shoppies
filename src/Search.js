import "./App.css";
import Movie from "./Movie";
import React, { useEffect, useState } from "react";

const Search = () => {
	const API_KEY = "5041fff3";

	const [movies, setMovies] = useState([]);
	const [search, setSearch] = useState("");
	const [query, setQuery] = useState("love");

	useEffect(() => {
		getMovies();
	}, [query]);

	const getMovies = async () => {
		const response = await fetch(
			`http://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`
		);
		const data = await response.json();
		setMovies(data);
	};

	const updateSearch = (e) => {
		setSearch(e.target.value);
	};

	const getSearch = (e) => {
		e.preventDefault();
		setQuery(search);
	};

	return (
		<div className="search">
			Find Movies
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
			<div className="movies">
				{movies.map((movie) => (
					<Movie />
				))}
			</div>
		</div>
	);
};

export default Search;
