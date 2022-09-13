import AuthPage from "./AuthPage";
import MainBox from "../styledComponents/MainBox";
import ExamBar from "./ExamBar";
import EventGrid from "./EventGrid";

interface props {
	loggedIn: boolean
}

const MainContent = (props: props) => {
	return (
		<MainBox sx={{pt: 2, height: "100%"}}>
			{ props.loggedIn ? (
				<MainBox sx={{flexDirection: 'column', justifyContent: "flex-start",  alignItems: 'center', height: "100%"}}>
					<ExamBar/>
					<EventGrid/>
				</MainBox>
			) : (
				<AuthPage/>
			)}
		</MainBox>
	)
}

export default MainContent
