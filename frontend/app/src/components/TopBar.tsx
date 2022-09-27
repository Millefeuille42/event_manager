// Created by millefeuille on 11-Sep-22

import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import TopBarSearch from "./TopBarAddons/TopBarSearch";
import TopBarAccountMenu from "./TopBarAddons/TopBarAccountMenu";
import {userData} from "../actions/queriesData";

interface props {
	loggedIn: boolean
	user: userData | null
	manageSearch: Function
}

const TopBar = (props:props) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar>
					<Typography
						variant={"h6"}
						noWrap
						component={"div"}
						sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}
					>
						Event Manager
					</Typography>

					{props.user !== null && (
											<Typography
						variant={"button"}
						noWrap
						component={"div"}
						sx={{ flexGrow: 1, display: {xs: 'block', sm: 'block'} }}
					>
						{props.user.login}
					</Typography>
					)}
					{props.loggedIn && <TopBarSearch manageSearch={props.manageSearch}/> }
					{props.loggedIn && <TopBarAccountMenu/> }
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default TopBar
