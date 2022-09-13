import {Box, Card, CardContent, Typography} from "@mui/material";
import {event} from "../EventGrid"

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
	event: event
}

const EventCard = (props:props) => {
	return (
		<Card sx={cardStyle} elevation={6}>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component='div' variant='h5'>
						{props.event.title}
					</Typography>
					<Typography component='div' variant='subtitle1' color="text.secondary">
						{props.event.kind}
					</Typography>
				</CardContent>
				<Box sx={{display: 'flex', alignItems: 'center', pl: 2, pb: 1}}>
					<Typography component='div' variant='overline'>
						{props.event.location}
					</Typography>
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
			</Box>
		</Card>
	)
}

export default EventCard