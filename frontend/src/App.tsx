import React, {useEffect, useState} from 'react';
import './sheets/App.css';
import TopBar from "./components/TopBar";
import {Box, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {getAuthToken, getUser} from "./queries";
import MainContent from "./components/MainContent";
import MainBox from "./styledComponents/MainBox";
import {userData} from "./queriesData";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});


function App() {
	const [connected, setConnected] = useState(false)
	const [user, setUser] = useState<userData | null>(null)

	const checkQueryForAuth = () => {
		const params = (new URL(window.location.toString())).searchParams
		if (params.has("code") && params.has("state")) {
			const code = params.get("code") || ""
			const state = params.get("state") || ""

			getAuthToken(code, state).then((rToken: string) => {
				window.history.pushState('', '', "/")
				setConnected(true)
				window.sessionStorage.setItem("Session", rToken)
				getUserData()
			}).catch((e) => {
				console.log(e)
			})
		}
	}

	const getUserData = () => {
		let token = window.sessionStorage.getItem("Session")
		if (token === null)
			return
		getUser('me', token).then((user: userData) => {
			setUser(user)
		}).catch((e) => {
			console.log(e)
		})
	}

	useEffect( () => {
		let token = window.sessionStorage.getItem("Session")
		if (!token) {
			console.log("No token")
			checkQueryForAuth()
			return
		}
		setConnected(true)
		if (user === null)
			getUserData()
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<TopBar loggedIn={connected} user={user}/>
			<MainBox sx={{height: '87vh'}}>
				<MainContent user={user} loggedIn={connected}/>
			</MainBox>
		</ThemeProvider>
	);
}

export default App;
