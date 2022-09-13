import MainBox from "../styledComponents/MainBox";
import {Box, Paper} from "@mui/material";
import EventCard from "./EventGridAddons/EventCard";
import {eventParsed, eventData} from "../queriesData";
import {useEffect} from "react";

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

interface props {
	exam: boolean
	sub: boolean
	filter: string | null
	events: eventData[]
}

const EventGrid = (props:props) => {

	const getFilteredList = () => {
		let eventList = props.events

		if (props.sub && props.filter !== null) {
			eventList = props.events.filter((event: eventData) => {
				return new Date(event.begin_at) > new Date()
			})
		}
		return eventList
	}

	let nl = getFilteredList()

	return (
		<MainBox sx={{
				height: props.exam ? "68%" : '90%',
				width: '95%',
			}}
		>
			{nl.length > 0 && (
				<Paper sx={paperStyle}>
					<Box sx={listStyle}>
						{
							nl.map((event: eventData, index: number) => {
								const date = new Date(event.begin_at)
								const day = date.getDate().toString()
								const month = date.toLocaleString('default', {month: 'long'})
								let newEvent: eventParsed = {...event, day: day, month: month}
								return (
									<EventCard
										key={index}
										event={newEvent}/>
								)
							})}
					</Box>
				</Paper>
			)}
		</MainBox>
	)
}

export default EventGrid
