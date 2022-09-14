// Created by millefeuille on 11-Sep-22

import SearchIcon from '@mui/icons-material/Search';
import {SearchIconWrapper} from "../../styledComponents/TopBarSearch/SearchIconWrapper";
import {StyledInputBase} from "../../styledComponents/TopBarSearch/StyledInputBase";
import {Search} from "../../styledComponents/TopBarSearch/Search";
import {ChangeEvent, FormEvent, useState} from "react";
import {getUser} from "../../queries";
import {userData} from "../../queriesData";
import {Button} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const TopBarSearch = (props:{manageSearch: Function}) => {
	const [input, setInput] = useState("")

	const handleClick = () => {
		props.manageSearch(null, true)
		setInput("")
	}

	const handleChange = (e: ChangeEvent) => {
		e.preventDefault()
		let target = e.target as HTMLInputElement
		setInput(target.value)
	}

	const handleSearch = (e: FormEvent) => {
		e.preventDefault()
		let token = window.sessionStorage.getItem("Session")
		if (token === null)
			return
		getUser(input, token).then((user: userData) => {
			props.manageSearch(user, false)
		}).catch((e) => {
			if (e.response && e.response.status == 404) {
				alert("User not found")
			} else {
				alert("Unknown error occurred")
			}
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
			<Button onClick={handleClick}>
				<CloseIcon/>
			</Button>
		</Search>
	)
}

export default TopBarSearch
