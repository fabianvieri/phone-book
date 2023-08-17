function App() {
	return (
		<div>
			<h1>Phone Book</h1>
			<p>{process.env.REACT_APP_API_URI}</p>
		</div>
	);
}

export default App;
