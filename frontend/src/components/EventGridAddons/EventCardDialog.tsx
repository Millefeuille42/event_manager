import {
	Box, Button, CircularProgress,
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, LinearProgress, Link,
	Typography
} from "@mui/material";
import {eventParsed, eventSub} from "../../queriesData";
import {useState} from "react";
import {getEventData} from "../../queries";

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
			console.log(e)
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
		</Dialog>
	)
}

export default EventCardDialog