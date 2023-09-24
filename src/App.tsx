import React from 'react';
import { applicationTheme } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CheckRoutes from './utils/CheckRoutes';
import Epilation from './pages/epilation';

function App() {
	return (
		<ThemeProvider theme={applicationTheme}>
			<CssBaseline />
			<Routes>
				<Route element={<CheckRoutes />}>
					<Route path="/" element={<Home />} />
					<Route path="/épilation" element={<Epilation />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
