import {Box, Paper, ToggleButton, ToggleButtonGroup} from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import UpdateIcon from '@mui/icons-material/Update';
import TodayIcon from '@mui/icons-material/Today';
import ThreePIcon from '@mui/icons-material/ThreeP';

import React, {useState, MouseEvent, useEffect} from "react";

const boxStyle = {
	width: '50%',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-around',
	height: "8%",
	mb: 2,
}

interface props {
	onChange: Function
}

const FilterBar = (props:props) => {
	const [showExam, setShowExam] = useState(true)
	const [filter, setFilter] = useState<string | null>(null)
	const [showSub, setShowSub] = useState(false)

	const handleFilter = (e: MouseEvent, newFilter: string | null) => {
		props.onChange(showExam, newFilter, showSub)
    	setFilter(newFilter);
	}

	const handleExam = () => {
		props.onChange(!showExam, filter, showSub)
		setShowExam(!showExam)
	}

	const handleSub = () => {
		let newFilter = filter
		if (showSub) {
			newFilter = null
			setFilter(null)
		}
		props.onChange(showExam, newFilter, !showSub)
		setShowSub(!showSub)
	}

	useEffect(() => {
	},)

	return (
		<Box sx={boxStyle}>
			<Box>
				<ToggleButton
					value="exam"
					selected={showExam}
					onChange={handleExam}
				>
					<SchoolIcon/>
				</ToggleButton>
			</Box>
			<Box>
				<ToggleButton
					value="sub"
					selected={showSub}
					onChange={handleSub}
				>
					<ThreePIcon/>
				</ToggleButton>
			</Box>
			<Box visibility={showSub ? 'visible' : 'hidden'}>
				<ToggleButtonGroup
					value={filter}
					exclusive
					onChange={handleFilter}
					aria-label="filter"
				>
					<ToggleButton value="now" aria-label="now">
						<TodayIcon/>
					</ToggleButton>
					<ToggleButton value="later" aria-label="later">
						<UpdateIcon/>
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
		</Box>
	)
}

export default FilterBar