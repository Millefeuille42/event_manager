// Created by millefeuille on 11-Sep-22

import SearchIcon from '@mui/icons-material/Search';
import {SearchIconWrapper} from "../../styledComponents/TopBarSearch/SearchIconWrapper";
import {StyledInputBase} from "../../styledComponents/TopBarSearch/StyledInputBase";
import {Search} from "../../styledComponents/TopBarSearch/Search";

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
