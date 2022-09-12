import React, {useEffect, useState} from 'react';
import './App.css';
import TopBar from "./components/TopBar";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import AuthPage from "./components/AuthPage";
import {getAuthToken, getUser} from "./queries";
import {userData} from "./queriesData";
import MainContent from "./components/MainContent";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});


function App() {
	const [userLoaded, setUserLoaded] = useState(false)
	let token: string

	const onMount = async () => {
		const params = (new URL(window.location.toString())).searchParams
		if (params.has("code") && params.has("state")) {
			const code = params.get("code") || ""
			const state = params.get("state") || ""

			await getAuthToken(code, state).then((rToken: string) => {
				window.history.pushState('', '', "/")
				window.localStorage.setItem("session", rToken)
				setUserLoaded(true)
			}).catch((e) => {
				console.log(e)
			})
		}
	}

	useEffect( () => {
		token = window.localStorage.getItem("session") || ""
		if (token === "") {
			console.log("no token")
			onMount()
		} else {
			setUserLoaded(true)
		}
		return () => {
		}
	})

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<TopBar/>
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
				<MainContent loggedIn={userLoaded}/>
			</Box>
		</ThemeProvider>
	);
}

export default App;
