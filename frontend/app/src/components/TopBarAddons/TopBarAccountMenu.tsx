// Created by millefeuille on 11-Sep-22

import LogoutIcon from '@mui/icons-material/Logout';
import {IconButton} from "@mui/material";

const TopBarAccountMenu = () => {
	const handleDisconnect = () => {
		window.sessionStorage.clear()
		window.location.reload()
	}

	return (
		<IconButton
			onClick={handleDisconnect}
			size="large"
			edge={"start"}
			color={"inherit"}
			aria-label={"Disconnect"}
			sx={{ ml: 2 }}
		>
			<LogoutIcon/>
		</IconButton>
	)
}

export default TopBarAccountMenu
