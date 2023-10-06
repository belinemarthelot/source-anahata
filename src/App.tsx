import React from 'react';
import { applicationTheme } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CheckRoutes from './utils/CheckRoutes';
import Epilation from './pages/epilation';
import Prestation from './pages/prestation';

function App() {
	return (
		<ThemeProvider theme={applicationTheme}>
			<CssBaseline />
			<Routes>
				<Route element={<CheckRoutes />}>
					<Route path="/" element={<Home />} />
					<Route path="/epilation" element={<Prestation jsonFile={"epilation.json"} />} />
					<Route path="/beaute-du-regard" element={<Prestation jsonFile={"beaute-du-regard.json"} />} />
					<Route path="/onglerie" element={<Prestation jsonFile={"onglerie.json"} />} />
					<Route path="/soin-visage" element={<Prestation jsonFile={"soin-visage.json"} />} />
					<Route path="/soin-corps" element={<Prestation jsonFile={"soin-corps.json"} />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
