// Created by millefeuille on 11-Sep-22

import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import TopBarSearch from "./TopBarAddons/TopBarSearch";
import TopBarAccountMenu from "./TopBarAddons/TopBarAccountMenu";

interface props {
	loggedIn: boolean
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
					<TopBarSearch/>
					{props.loggedIn ? <TopBarAccountMenu/> : <template></template>}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default TopBar
