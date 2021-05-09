const Nomination = ({ nomination, deleteNomination }) => {
	return (
		<ol>
			{nomination} <br />
			<button
				className="delete-from-nominations-button"
				onClick={() => deleteNomination(nomination)}
				className="search-button"
				value={nomination}
			>
				Delete from Nomination
			</button>
		</ol>
	);
};

export default Nomination;
