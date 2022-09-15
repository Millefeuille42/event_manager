import {AlertColor, Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {getAuthLink} from "../actions/queries";
import {useState} from "react";
import StatusSnack, {snackProps} from "./StatusSnack";

const cardStyle = {
	height: "150px",
	minWidth: 350,
	width: '40%',
	marginTop: 4
}

const AuthPage = () => {
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

	const handleClick = async () => {
		await getAuthLink().then((link: string) => {
			window.location.href = link
		}).catch(() => {
			showSnack("Main server seems down")
		})
	}

	return (
		<Card sx={cardStyle}>
			<CardContent>
				<Typography variant="h5" component="div">
					Restricted Access
				</Typography>
				<Typography variant="body2">
					You need to be logged in to 42 to access this site
				</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={handleClick}> Log in with 42 </Button>
			</CardActions>
			<StatusSnack data={snack} onClose={hideSnack}/>
		</Card>
	)
}

export default AuthPage
