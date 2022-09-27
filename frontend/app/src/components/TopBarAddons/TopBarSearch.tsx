// Created by millefeuille on 11-Sep-22

import SearchIcon from '@mui/icons-material/Search';
import {SearchIconWrapper} from "../../styledComponents/TopBarSearch/SearchIconWrapper";
import {StyledInputBase} from "../../styledComponents/TopBarSearch/StyledInputBase";
import {Search} from "../../styledComponents/TopBarSearch/Search";
import {ChangeEvent, FormEvent, useState} from "react";
import {getUser} from "../../actions/queries";
import {userData} from "../../actions/queriesData";
import {AlertColor, IconButton} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {grey} from "@mui/material/colors";
import StatusSnack, {snackProps} from "../StatusSnack";
import resetSession from "../../actions/resetSession";

const TopBarSearch = (props:{manageSearch: Function}) => {
	const [input, setInput] = useState("")
	const [searched, setSearched] = useState(false)
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

	const handleClick = () => {
		props.manageSearch(null, true)
		setInput("")
		setSearched(false)
	}

	const handleChange = (e: ChangeEvent) => {
		e.preventDefault()
		let target = e.target as HTMLInputElement
		setInput(target.value)
	}

	const handleSearch = (e: FormEvent) => {
		e.preventDefault()
		const field = document.getElementById('search') as HTMLInputElement;
		field.blur()
		let token = window.sessionStorage.getItem("Session")
		if (token === null)
			return
		getUser(input, token).then((user: userData) => {
			props.manageSearch(user, false)
			setSearched(true)
			setInput("")
		}).catch((e) => {
			setInput("")
			if (e.response !== undefined) {
				if (e.response.status === 401) {
					showSnack("Your session expired")
					resetSession(2000)
					return
				}
				if (e.response.status === 429) {
					return
				}
				if (e.response && e.response.status === 404) {
					showSnack("User not found")
					return
				}
			}
			showSnack("An unknown error occurred")
		})
	}

	return(
		<Search onSubmit={handleSearch}>
			<SearchIconWrapper>
				<SearchIcon/>
			</SearchIconWrapper>
			<StyledInputBase
				onChange={handleChange}
				id={"search"}
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
				value={input}
			/>
			{searched && (
				<IconButton onClick={handleClick} aria-label={"Close search"}>
					<CloseIcon sx={{ color: grey[50] }}  />
				</IconButton>
			)}
			<StatusSnack data={snack} onClose={hideSnack}/>
		</Search>
	)
}

export default TopBarSearch
