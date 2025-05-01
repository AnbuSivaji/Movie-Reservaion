import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import './About.css';

const About = () => {
	const { theme } = useTheme();

	// Movie-themed team data
	const teamMembers = [
		{
			name: 'Christopher Filmline',
			role: 'Chief Curator',
			bio: 'Oscar-winning film critic with 15+ years in the industry',
			img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
		},
		{
			name: 'Scarlett Reels',
			role: 'Content Director',
			bio: 'Former studio executive specializing in cult classics',
			img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80',
		},
	];

	// Famous movie quotes
	const movieQuotes = [
		"“Here's looking at you, kid.” - Casablanca",
		'“May the Force be with you.” - Star Wars',
		"“You're gonna need a bigger boat.” - Jaws",
		"“I'll be back.” - The Terminator",
	];

	return (
		<div className={`about-container ${theme}`}>
			<div
				className='about-hero'
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1350&q=80')`,
				}}
			>
				<h1>
					About <span>MovieFlix</span>
				</h1>
				<p>Where Cinema Comes Alive</p>
			</div>

			<div className='about-content'>
				<section className='about-mission'>
					<h2>🎬 Our Story</h2>
					<p>
						Founded in 2023, MovieFlix emerged from a passion project between
						two film school graduates. Today we serve{' '}
						<strong>2.5 million</strong> movie lovers monthly with:
					</p>
					<div className='stats-grid'>
						<div className='stat-card'>
							<div className='stat-number'>50,000+</div>
							<div className='stat-label'>Titles</div>
						</div>
						<div className='stat-card'>
							<div className='stat-number'>100+</div>
							<div className='stat-label'>Film Festivals</div>
						</div>
						<div className='stat-card'>
							<div className='stat-number'>24/7</div>
							<div className='stat-label'>Support</div>
						</div>
					</div>
				</section>

				<section className='about-team'>
					<h2>🌟 The Visionaries</h2>
					<div className='team-grid'>
						{teamMembers.map((member, index) => (
							<div
								className='team-member'
								key={index}
							>
								<div
									className='member-img'
									style={{ backgroundImage: `url(${member.img})` }}
								></div>
								<h3>{member.name}</h3>
								<p className='role'>{member.role}</p>
								<p className='bio'>{member.bio}</p>
							</div>
						))}
					</div>
				</section>

				<section className='about-features'>
					<h2>🍿 Why Movie Buffs Love Us</h2>
					<ul>
						<li>🎞️ Rare archival footage from classic films</li>
						<li>📽️ Director's commentary tracks</li>
						<li>🎬 Oscar-winning films in 4K HDR</li>
						<li>🍿 Weekly curated watchlists</li>
					</ul>
				</section>

				<section className='movie-trivia'>
					<h2>🎥 Did You Know?</h2>
					<div className='quotes-slider'>
						{movieQuotes.map((quote, index) => (
							<div
								className='quote'
								key={index}
							>
								{quote}
							</div>
						))}
					</div>
				</section>

				<Link
					to='/'
					className='back-home-btn'
				>
					Back to Cinematic Experience
				</Link>
			</div>
		</div>
	);
};

export default About;
