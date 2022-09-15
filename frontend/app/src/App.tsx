import React, {useEffect, useState} from 'react';
import './sheets/App.css';
import TopBar from "./components/TopBar";
import {AlertColor, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {getAuthToken, getUser} from "./actions/queries";
import MainContent from "./components/MainContent";
import MainBox from "./styledComponents/MainBox";
import {userData} from "./actions/queriesData";
import StatusSnack, {snackProps} from "./components/StatusSnack";
import resetSession from "./actions/resetSession";

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});


function App() {
	const [connected, setConnected] = useState(false)
	const [user, setUser] = useState<userData | null>(null)
	const [snack, setSnack] = useState({} as snackProps)

	const showSnack = (message: string, severity: AlertColor = "error") => {
		setSnack({
			open: true,
			message: message,
			severity: severity
		} as snackProps)
	}

	const hideSnack = () => {
		setSnack({severity: snack.severity, message: snack.message} as snackProps)
	}

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
				if (e.response !== undefined) {
					if (e.response.status === 401) {
						showSnack("Your session expired")
						resetSession(2000)
						return
					}
					if (e.response.status === 429) {
						return
					}
				}
				showSnack("An unknown error occurred")
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
			if (e.response !== undefined) {
				if (e.response.status === 401) {
					showSnack("Your session expired")
					resetSession(2000)
					return
				}
				if (e.response.status === 429) {
					return
				}
			}
			showSnack("An unknown error occurred")
		})
	}

	const handleSearchUser = async (data: userData, cancel: boolean) => {
		console.log(cancel)
		if (cancel) {
			let token = window.sessionStorage.getItem("Session")
			if (token === null)
				return
			getUser('me', token).then((user: userData) => {
				setUser(user)
			}).catch((e) => {
				if (e.response !== undefined) {
					if (e.response.status === 401) {
						showSnack("Your session expired")
						resetSession(2000)
						return
					}
					if (e.response.status === 429) {
						return
					}
				}
				showSnack("An unknown error occurred")
			})
			return
		}
		setUser(data)
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
		// eslint-disable-next-line
	}, [])

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<TopBar manageSearch={handleSearchUser} loggedIn={connected} user={user}/>
			<MainBox sx={{height: '87vh'}}>
				<MainContent user={user} loggedIn={connected}/>
				<StatusSnack data={snack} onClose={hideSnack}/>
			</MainBox>
		</ThemeProvider>
	);
}

export default App;
