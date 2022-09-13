import MainBox from "../styledComponents/MainBox";
import {Box, Grid, Paper, styled} from "@mui/material";
import EventCard from "./EventGridAddons/EventCard";

export interface event {
	title: string
	day: string,
	month: string,
	description: string,
	kind: string,
	location: string
}

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

const boxStyle = {
	pt: 0,
	height: "68%",
	width: '95%',
}

const EventGrid = () => {
	let events: event[] = []
	for (let i = 0; i < 32; i++) {
		events.push({
			title: "My event",
			day: i.toString(),
			month: "sept",
			description: "Oui alors écoute moi, là on voit qu'on a beaucoup à travailler sur nous-mêmes car entre " +
				"penser et dire, il y a un monde de différence et parfois c'est bon parfois c'est pas bon. " +
				"Il y a un an, je t'aurais parlé de mes muscles." +
				"Je ne voudrais pas rentrer dans des choses trop dimensionnelles, " +
				"mais, si vraiment tu veux te rappeler des souvenirs de ton perroquet, entre penser et dire, il y a " +
				"un monde de différence et ça, c'est très dur, et, et, et... c'est très facile en même temps. " +
				"Tu vas te dire : J'aurais jamais cru que le karaté guy pouvait parler comme ça ! ",
			kind: "Generic",
			location: "kekpart"
		})
	}

	return (
		<MainBox sx={boxStyle}>
			<Paper sx={paperStyle}>
				<Box sx={listStyle}>
					{events.map((event: event) => {
						return (
							<EventCard event={event}/>
						)
					})}
				</Box>
			</Paper>
		</MainBox>
	)
}

export default EventGrid
