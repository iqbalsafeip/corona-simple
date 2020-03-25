import React, { useState, useEffect } from 'react';
import tempe from 'tempe';

const API_ENDPOINT = 'https://covid19.mathdro.id/api/countries/indonesia/confirmed';

function CardInfo(props) {
	return (
		<div className="col-12 my-2 card card-body d-flex justify-content-center align-items-center">
			{props.children}
			<span>{props.title}</span>
			<span>{props.value}</span>
		</div>
	);
}

function App() {
	const [ date, setDate ] = useState('');
	const [ data, setData ] = useState({});
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		fetch(API_ENDPOINT).then((res) => res.json()).then((result) => {
			setData(result[0]);
			const date = new Date(result[0]['lastUpdate']);
			const newDate = tempe(date).format('DD MMM YYYY', 'id');
			setDate(newDate);
			setLoading(true);
		});
	}, []);

	return (
		<div
			style={{
				backgroundImage: 'linear-gradient(to right top, #4b90f8, #268fe8, #008cd7, #0088c4, #0083b1)',
				minHeight: '100vh'
			}}
		>
			<div className="container py-4">
				<header>
					<div className="jumbotron jumbotron-fluid text-center rounded shadow">
						<h2>{date}</h2>
						<p className="lead">{data['countryRegion']}</p>
					</div>
				</header>
				{loading ? (
					<main className="container">
						<div className="row">
							<CardInfo title="Confirmed" value={data['confirmed']}>
								<svg
									viewBox="0 0 24 24"
									width="24"
									height="24"
									stroke="yellow"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="css-i6dzq1"
								>
									<circle cx="12" cy="12" r="10" />
									<line x1="12" y1="8" x2="12" y2="16" />
									<line x1="8" y1="12" x2="16" y2="12" />
								</svg>
							</CardInfo>
							<CardInfo title="Recovered" value={data['recovered']}>
								<svg
									viewBox="0 0 24 24"
									width="24"
									height="24"
									stroke="green"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="css-i6dzq1"
								>
									<circle cx="12" cy="12" r="10" />
									<path d="M8 14s1.5 2 4 2 4-2 4-2" />
									<line x1="9" y1="9" x2="9.01" y2="9" />
									<line x1="15" y1="9" x2="15.01" y2="9" />
								</svg>
							</CardInfo>
							<CardInfo title="Active" value={data['active']}>
								<svg
									viewBox="0 0 24 24"
									width="24"
									height="24"
									stroke="blue"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="css-i6dzq1"
								>
									<polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
								</svg>
							</CardInfo>
							<CardInfo title="Deaths" value={data['deaths']}>
								<svg
									viewBox="0 0 24 24"
									width="24"
									height="24"
									stroke="red"
									strokeWidth="2"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="css-i6dzq1"
								>
									<circle cx="12" cy="12" r="10" />
									<path d="M16 16s-1.5-2-4-2-4 2-4 2" />
									<line x1="9" y1="9" x2="9.01" y2="9" />
									<line x1="15" y1="9" x2="15.01" y2="9" />
								</svg>
							</CardInfo>
						</div>
					</main>
				) : (
					<p className="text-white text-center">Loading..</p>
				)}
			</div>
		</div>
	);
}

export default App;
