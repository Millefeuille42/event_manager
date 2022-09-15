import {
	AlertColor,
	Box, Button,
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, LinearProgress, Link,
	Typography
} from "@mui/material";
import {eventParsed, eventSub} from "../../actions/queriesData";
import {useState} from "react";
import {getEventData} from "../../actions/queries";
import StatusSnack, {snackProps} from "../StatusSnack";
import resetSession from "../../actions/resetSession";

interface props {
	open: boolean
	onClose: Function
	event: eventParsed
}

const subtitleBox = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
	flexWrap: 'wrap',
	width: '100%',
}

const SubSpawner = (props:{subs: eventSub[]}) => {
	return (
		<Box>
			{ props.subs.length > 0 ? (
				<Box sx={subtitleBox}>
					{props.subs.map((sub: eventSub) => {
						return (
							<Link
								sx={{ml: 1, mr: 1}}
								href={sub.url}
								variant={"body1"}
								underline={"none"}
								target={"_blank"}
								rel={"noopener"}
							>
								{sub.login}
							</Link>
						)
					})}
				</Box>
			) : (
				<Typography component={'div'} variant={"h6"}>
					Nobody subscribed to this event yet
				</Typography>
			)}
		</Box>
	)
}

const EventCardDialog = (props:props) => {
	const [showSubs, setShowSubs] = useState(false)
	const [subs, setSubs] = useState([] as eventSub[])
	const [loaded, setLoaded] = useState(false)
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

	const handleClose = () => {
		setSubs([])
		setLoaded(false)
		setShowSubs(false)
		props.onClose()
	}

	const handleSwitch = () => {
		setShowSubs(!showSubs)
		if (!showSubs && subs.length <= 0)
			getEventSubs()
	}

	const getEventSubs = () => {
		let token = window.sessionStorage.getItem("Session")
		if (token === null)
			return
		getEventData(props.event.id, token).then((subs) => {
			setSubs(subs)
			setLoaded(true)
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

	return (
		<Dialog open={props.open} onClose={handleClose}>
			<DialogTitle>
				{ props.event.name }
				<Box sx={subtitleBox}>
					<Typography sx={{mr: 2}} noWrap component='div' variant='subtitle1' color="text.secondary">
						{props.event.kind}
					</Typography>
					<Typography noWrap component='div' variant='overline'>
						{'[ ' + props.event.location + ' ]'}
					</Typography>
				</Box>
			</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>
					{showSubs ? (
						<Box>
							{loaded ? (
								<SubSpawner subs={subs}/>
							) : (
								<LinearProgress/>
							)}
						</Box>
					) : (
						props.event.description
					)}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSwitch}>
					{showSubs ? (
						"See description"
					) : (
						"See subscribers"
					)}
				</Button>
			</DialogActions>
			<StatusSnack data={snack} onClose={hideSnack}/>
		</Dialog>
	)
}

export default EventCardDialog