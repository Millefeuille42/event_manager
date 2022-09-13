import AuthPage from "./AuthPage";
import MainBox from "../styledComponents/MainBox";
import ExamBar from "./ExamBar";
import EventGrid from "./EventGrid";
import FilterBar from "./FilterBar";
import {useEffect, useState} from "react";
import {getAllEvents, getSubEvents} from "../queries";
import {eventData, userData} from "../queriesData";

interface props {
	loggedIn: boolean
	user: userData | null
}

const MainContent = (props: props) => {
	const [showExam, setShowExam] = useState(true)
	const [showSub, setShowSub] = useState(false)
	const [filter, setFilter] = useState<string | null>(null)
	const [events, setEvents] = useState([] as eventData[])

	const onChange = (exam: boolean, newFilter: string | null, sub: boolean) => {
		if (exam != showExam)
			setShowExam(exam)
		if (newFilter != filter)
			setFilter(newFilter)
		if (sub != showSub) {
			setEvents([])
			setShowSub(sub)
		}
	}

	const getAllEventsData = () => {
		let token = window.sessionStorage.getItem("Session")
		if (token === null || props.user === null)
			return
		getAllEvents(props.user.campus, token).then((events: eventData[]) => {
			setEvents(events.reverse())
		}).catch((e) => {
			console.log(e)
		})
	}

	const getSubbedEventsData = () => {
		let token = window.sessionStorage.getItem("Session")
		if (token === null || props.user === null)
			return
		getSubEvents(props.user.login, token).then((events: eventData[]) => {
			setEvents(events.reverse())
		}).catch((e) => {
			console.log(e)
		})
	}

	useEffect(() => {
		if (events.length <= 0) {
			if (!showSub) {
				getAllEventsData()
			} else {
				getSubbedEventsData()
			}
		}
	})

	return (
		<MainBox sx={{pt: 2, height: "100%"}}>
			{ props.loggedIn ? (
				<MainBox sx={{flexDirection: 'column', justifyContent: "flex-start",  alignItems: 'center', height: "100%"}}>
					<FilterBar onChange={onChange}/>
					{showExam && (
						<ExamBar/>
					)}
					<EventGrid events={events} filter={filter} exam={showExam} sub={showSub} />
				</MainBox>
			) : (
				<AuthPage/>
			)}
		</MainBox>
	)
}

export default MainContent
