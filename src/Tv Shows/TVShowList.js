import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TVShowList.css'; // Assuming you have a CSS file for styling

const TVShowList = () => {
	const [content, setContent] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Mock data - Replace with actual API calls
		const loadData = () => {
			setLoading(true);

			const allContent = [
				// Tamil Web Series
				{
					id: 1,
					title: 'சென்னை சிஸ்டர்ஸ்',
					englishTitle: 'Chennai Sisters',
					poster: '/tamil1.jpg',
					year: '2023',
					rating: 8.2,
					type: 'tamil-series',
					language: 'ta',
				},
				{
					id: 2,
					title: 'கல்யாணம் முடிஞ்சது',
					englishTitle: 'Kalyanam Mudinchadu',
					poster: '/tamil2.jpg',
					year: '2023',
					rating: 7.9,
					type: 'tamil-series',
					language: 'ta',
				},

				// International Web Series
				{
					id: 101,
					title: 'Stranger Things',
					poster: '/stranger.jpg',
					year: '2016',
					rating: 8.7,
					type: 'international-series',
					language: 'en',
				},
				{
					id: 102,
					title: 'Money Heist',
					poster: '/moneyheist.jpg',
					year: '2017',
					rating: 8.3,
					type: 'international-series',
					language: 'es',
				},

				// Movies
				{
					id: 201,
					title: 'விக்ரம்',
					englishTitle: 'Vikram',
					poster: '/vikram.jpg',
					year: '2022',
					rating: 8.7,
					type: 'movie',
					language: 'ta',
				},
				{
					id: 202,
					title: 'Avengers',
					poster: '/avengers.jpg',
					year: '2019',
					rating: 8.4,
					type: 'movie',
					language: 'en',
				},
			];

			setContent(allContent);
			setLoading(false);
		};

		loadData();
	}, []);

	if (loading) return <div className='loading-grid'>Loading...</div>;

	return (
		<div className='grid-container'>
			<h1 className='grid-header'>All Content</h1>

			<div className='content-grid'>
				{content.map((item) => (
					<Link
						to={`/${item.type}/${item.id}`}
						key={item.id}
						className={`grid-item ${item.type}`}
					>
						<img
							src={item.poster}
							alt={item.title}
							className='grid-poster'
							onError={(e) => {
								e.target.src = '/placeholder.jpg';
							}}
						/>
						<div className='grid-info'>
							<h3 className='grid-title'>
								{item.language === 'ta' ? (
									<>
										<span className='tamil-text'>{item.title}</span>
										{item.englishTitle && (
											<span className='english-text'>{item.englishTitle}</span>
										)}
									</>
								) : (
									item.title
								)}
							</h3>
							<div className='grid-meta'>
								<span>{item.year}</span>
								<span>★ {item.rating}</span>
							</div>
							<div className='grid-tag'>
								{item.type === 'tamil-series' && 'Tamil Series'}
								{item.type === 'international-series' && 'International'}
								{item.type === 'movie' && 'Movie'}
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TVShowList;
