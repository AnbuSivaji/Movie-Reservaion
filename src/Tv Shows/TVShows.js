import React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import './Media.css';

const TVShows = () => {
	const { category } = useParams();

	return (
		<div className='media-page'>
			<h1>TV Shows {category ? `- ${category.replace('-', ' ')}` : ''}</h1>
			<div className='media-grid'>
				{/* This will be replaced by actual TV show data */}
				<Outlet />
			</div>
		</div>
	);
};

export default TVShows;
