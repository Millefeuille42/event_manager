// Created by millefeuille on 11-Sep-22

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {IconButton} from "@mui/material";

const TopBarAccountMenu = () => {
	return (
		<IconButton
			size="large"
			edge={"start"}
			color={"inherit"}
			aria-label={"open drawer"}
			sx={{ ml: 2 }}
		>
			<AccountCircleIcon/>
		</IconButton>
	)
}

export default TopBarAccountMenu
