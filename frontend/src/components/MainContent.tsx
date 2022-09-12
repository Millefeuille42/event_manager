import AuthPage from "./AuthPage";
import UserPage from "./UserPage";

interface props {
	loggedIn: boolean
}

const MainContent = (props: props) => {
	return (
		<div>
			{ props.loggedIn ? (
				<UserPage/>
			) : (
				<AuthPage/>
			)}
		</div>
	)
}

export default MainContent
