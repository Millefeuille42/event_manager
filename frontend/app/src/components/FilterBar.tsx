import {Box, ToggleButton, ToggleButtonGroup} from "@mui/material";
import UpdateIcon from '@mui/icons-material/Update';
import TodayIcon from '@mui/icons-material/Today';
import ThreePIcon from '@mui/icons-material/ThreeP';

import React, {useState, MouseEvent, useEffect} from "react";

const boxStyle = {
	width: '50%',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	height: "8%",
	mb: 2,
}

interface props {
	onChange: Function
}

const FilterBar = (props:props) => {
	//const [showExam, setShowExam] = useState(false)
	const [filter, setFilter] = useState<string | null>(null)
	const [showSub, setShowSub] = useState(false)

	const handleFilter = (e: MouseEvent, newFilter: string | null) => {
	//	props.onChange(showExam, newFilter, showSub)
		props.onChange(newFilter, showSub)
    	setFilter(newFilter);
	}

	// const handleExam = () => {
	// 	props.onChange(!showExam, filter, showSub)
	// 	setShowExam(!showExam)
	// }

	const handleSub = () => {
		let newFilter = filter
		if (showSub) {
			newFilter = null
			setFilter(null)
		}
	//	props.onChange(showExam, newFilter, !showSub)
		props.onChange(newFilter, !showSub)
		setShowSub(!showSub)
	}

	useEffect(() => {
	},)

	return (
		<Box sx={boxStyle}>
			<Box sx={{mr: 2}}>
				<ToggleButton
					value="sub"
					aria-label={"Show subscribed projects"}
					selected={showSub}
					onChange={handleSub}
				>
					<ThreePIcon/>
				</ToggleButton>
			</Box>
			{showSub && (
				<Box visibility={showSub ? 'visible' : 'hidden'}>
					<ToggleButtonGroup
						value={filter}
						exclusive
						onChange={handleFilter}
						aria-label="filter"
					>
						<ToggleButton value="now" aria-label="Show events for today">
							<TodayIcon/>
						</ToggleButton>
						<ToggleButton value="later" aria-label="Show events for later">
							<UpdateIcon/>
						</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			)}
		</Box>
	)
}

export default FilterBar