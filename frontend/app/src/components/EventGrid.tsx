import MainBox from "../styledComponents/MainBox";
import {Box, CircularProgress, Paper, Typography} from "@mui/material";
import EventCard from "./EventGridAddons/EventCard";
import {eventParsed, eventData} from "../actions/queriesData";

const paperStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
}

const listStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	justifyContent: 'center',
	height: '90%',
	overflowY: 'scroll'
}





interface spawnerProps {
	list: eventData[]
}

const EventSpawner = (props:spawnerProps) => {
	return (
		<Paper sx={paperStyle}>
			{props.list.length > 0 ? (
				<Box sx={listStyle}>
		 			{
		 				props.list.map((event: eventData, index: number) => {
		 					const date = new Date(event.begin_at)
		 					let newEvent: eventParsed = {...event,
								day: date.getDate().toString(),
								month: date.toLocaleString('default', {month: 'long'}),
								year: date.getFullYear().toString(),
							 	hour: date.getHours().toString(),
								minutes: date.getMinutes().toString()
							 }
		 					return (
		 						<EventCard
		 							key={index}
		 							event={newEvent}/>
		 					)
		 				})
		 			}
		 		</Box>
			) : (
				<Typography align={'center'} component={"div"} variant={"h3"}>No events to display
				</Typography>
			)}
		</Paper>
	)
}

interface props {
	//exam: boolean
	sub: boolean
	filter: string | null
	events: eventData[] | null
	loaded: boolean
}

const EventGrid = (props:props) => {
	const getFilteredList = () => {
		if (props.events === null)
			return []
		let eventList: eventData[] /* = props.events */
		eventList = props.events.filter((event: eventData) => {
			return new Date(event.begin_at) >= new Date()
		})

		if (props.sub && props.filter === "now") {
			eventList = eventList.filter((event: eventData) => {
				return new Date(event.begin_at).getDate() === new Date().getDate()
			})
		}
		if (props.sub && props.filter === "later") {
			eventList = eventList.filter((event: eventData) => {
				return new Date(event.begin_at) > new Date()
			})
		}
		return eventList
	}

	let nl: eventData[] = []
	if (props.events !== null)
		 nl = getFilteredList()

	return (
		<MainBox sx={{
				height: /*props.exam ? "68%" : */'90%',
				width: '95%',
			}}
		>
			{props.loaded ? (
				<EventSpawner list={nl}/>
			) : (
				<Paper sx={paperStyle}>
					<CircularProgress size={64} />
				</Paper>
			)}
		</MainBox>
	)
}

export default EventGrid
