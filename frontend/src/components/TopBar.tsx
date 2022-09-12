// Created by millefeuille on 11-Sep-22

import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import TopBarBurgerMenu from "./TopBarAddons/TopBarBurgerMenu";
import TopBarSearch from "./TopBarAddons/TopBarSearch";
import TopBarAccountMenu from "./TopBarAddons/TopBarAccountMenu";

const TopBar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" >
				<Toolbar>
					<TopBarBurgerMenu/>
					<Typography
						variant={"h6"}
						noWrap
						component={"div"}
						sx={{ flexGrow: 1, display: {xs: 'none', sm: 'block'} }}
					>
						Event Manager
					</Typography>
					<TopBarSearch/>
					<TopBarAccountMenu/>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default TopBar
