import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {eventParsed} from "../../actions/queriesData";
import EventCardDialog from "./EventCardDialog";
import {useState} from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
const cardStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	minWidth: '300px',
	width: '40%',
	mx: 1,
	my: 1,
}

interface props {
	event: eventParsed
}

const EventCard = (props:props) => {
	const [openDialog, setOpenDialog] = useState(false)

	const handleMore = () => {
		setOpenDialog(true)
	}

	const handleClose = () => {
		setOpenDialog(false)
	}

	return (
		<Card sx={cardStyle} elevation={6}>
			<Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ width: '100%'}}>
					<Typography width={'100%'} component='div' noWrap variant='body1'>
						{props.event.name}
					</Typography>
					<Typography width={'100%'} noWrap component='div' variant='subtitle1' color="text.secondary">
						{props.event.kind}
					</Typography>
				</CardContent>
				<Box sx={{display: 'flex', alignItems: 'center', pl: 2, pb: 1}}>
					<Box sx={{mr: 2, display: 'flex', justifyItems: 'start'}}>
						<AccessAlarmIcon sx={{mr: 0.5}} fontSize={"small"}/>
						<Typography width={'80%'} noWrap component='div' variant='button'>
							{`${props.event.hour}h${props.event.minutes.padEnd(2, '0')}`}
						</Typography>
					</Box>
					<Button onClick={handleMore}>
						More
					</Button>
				</Box>
			</Box>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				pr: 3
			}}>
				<Typography component='div' variant={'h5'}>
					{props.event.day}
				</Typography>
				<Typography component='div' variant='subtitle1' color="text.secondary">
					{props.event.month}
				</Typography>
				<Typography component='div' variant='subtitle1' color="text.secondary">
					{props.event.year}
				</Typography>
			</Box>
			<EventCardDialog open={openDialog} event={props.event} onClose={handleClose}/>
		</Card>
	)
}

export default EventCard