// Created by millefeuille on 11-Sep-22

import {IconButton} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const TopBarBurgerMenu = () => {
	return (
		<IconButton
			size="large"
			edge={"start"}
			color={"inherit"}
			aria-label={"open drawer"}
			sx={{ mr: 2 }}
		>
			<MenuIcon/>
		</IconButton>
	)
}

export default TopBarBurgerMenu
