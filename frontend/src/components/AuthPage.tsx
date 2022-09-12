import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {getAuthLink} from "../queries";

const AuthPage = () => {
	const handleClick = async () => {
		await getAuthLink().then((link: string) => {
			window.location.href = link
		}).catch((e) => {
			console.log(e)
		})
	}

	return (
		<Card sx={{ minWidth: 350, width: '40%', marginTop: 12 }}>
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
		</Card>
	)
}

export default AuthPage
