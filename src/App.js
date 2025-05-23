import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Login from "./Login page/Login .js";
import SignUp from "./Login page/SignUp";
import Movies from "./Movies/Movies";
import Profile from "./Profile/Profile";
import ContactList from "./Contact/MovieStyleContact.jsx";
import About from "./About/About";
import TVShows from "./Tv Shows/TVShows";
import TVShowList from "./Tv Shows/TVShowList";

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem("isAuthenticated") === "true"
	);

	const handleLogin = () => {
		setIsAuthenticated(true);
		localStorage.setItem("isAuthenticated", "true");
	};

	const handleLogout = () => {
		setIsAuthenticated(false);
		localStorage.removeItem("isAuthenticated");
		localStorage.removeItem("currentUser");
	};

	return (
		<ThemeProvider>
			<Router>
				<Navbar
					isAuthenticated={isAuthenticated}
					onLogout={handleLogout}
				/>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/login'
						element={
							isAuthenticated ? (
								<Navigate to='/' />
							) : (
								<Login onLogin={handleLogin} />
							)
						}
					/>
					<Route
						path='/signup'
						element={isAuthenticated ? <Navigate to='/' /> : <SignUp />}
					/>
					<Route
						path='/movies'
						element={isAuthenticated ? <Movies /> : <Navigate to='/login' />}
					/>
					<Route
						path='/profile'
						element={isAuthenticated ? <Profile /> : <Navigate to='/login' />}
					/>
					<Route
						path='/contact'
						element={
							isAuthenticated ? (
								<ContactList />
							) : (
								<Navigate
									to='/login'
									state={{ from: '/contact' }}
								/>
							)
						}
					/>
					<Route
						path='/about'
						element={<About />}
					/>
					<Route
						path='/tv-shows'
						element={<TVShows />}
					>
						<Route
							index
							element={<TVShowList category='popular' />}
						/>
						<Route
							path='popular'
							element={<TVShowList category='popular' />}
						/>
						<Route
							path='airing-today'
							element={<TVShowList category='airing-today' />}
						/>
						<Route
							path='on-tv'
							element={<TVShowList category='on-tv' />}
						/>
						<Route
							path='top-rated'
							element={<TVShowList category='top-rated' />}
						/>
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
