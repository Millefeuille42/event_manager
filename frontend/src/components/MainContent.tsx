import AuthPage from "./AuthPage";
import MainBox from "../styledComponents/MainBox";
import ExamBar from "./ExamBar";
import EventGrid from "./EventGrid";
import FilterBar from "./FilterBar";
import {useEffect, useState} from "react";
import {getAllEvents, getSubEvents} from "../actions/queries";
import {eventData, userData} from "../actions/queriesData";
import StatusSnack, {snackProps} from "./StatusSnack";
import {AlertColor} from "@mui/material";
import resetSession from "../actions/resetSession";

interface props {
	loggedIn: boolean
	user: userData | null
}

const MainContent = (props: props) => {
	const [showExam, setShowExam] = useState(false)
	const [showSub, setShowSub] = useState(false)
	const [filter, setFilter] = useState<string | null>(null)
	const [events, setEvents] = useState([] as eventData[])
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

	const onChange = (exam: boolean, newFilter: string | null, sub: boolean) => {
		if (exam != showExam)
			setShowExam(exam)
		if (newFilter != filter)
			setFilter(newFilter)
		if (sub != showSub) {
			setEvents([])
			setShowSub(sub)
			setLoaded(false)
		}
	}

	const getAllEventsData = () => {
		let token = window.sessionStorage.getItem("Session")
		if (token === null || props.user === null)
			return
		getAllEvents(props.user.campus, token).then((events: eventData[]) => {
			setEvents(events.reverse())
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

	const getSubbedEventsData = () => {
		let token = window.sessionStorage.getItem("Session")
		if (token === null || props.user === null)
			return
		getSubEvents(props.user.login, token).then((events: eventData[]) => {
			setEvents(events.reverse())
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

	useEffect(() => {
		if (events.length <= 0) {
			if (!showSub) {
				getAllEventsData()
			} else {
				getSubbedEventsData()
			}
		}
	})

	useEffect(() => {
		setEvents([])
		setLoaded(false)
	}, [props.user])

	return (
		<MainBox sx={{pt: 2, height: "100%"}}>
			{ props.loggedIn ? (
				<MainBox sx={{flexDirection: 'column', justifyContent: "flex-start",  alignItems: 'center', height: "100%"}}>
					<FilterBar onChange={onChange}/>
					{showExam && (
						<ExamBar/>
					)}
					<EventGrid loaded={loaded} events={events} filter={filter} exam={showExam} sub={showSub} />
				</MainBox>
			) : (
				<AuthPage/>
			)}
			<StatusSnack data={snack} onClose={hideSnack}/>
		</MainBox>
	)
}

export default MainContent
