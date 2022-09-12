// Created by millefeuille on 11-Sep-22

import SearchIcon from '@mui/icons-material/Search';
import {Search, SearchIconWrapper, StyledInputBase} from "../../styles/TopBarSearch";

const TopBarSearch = () => {
	return(
		<Search>
			<SearchIconWrapper>
				<SearchIcon/>
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
			/>
		</Search>
	)
}

export default TopBarSearch
