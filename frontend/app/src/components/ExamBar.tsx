import {Box, Card, CardHeader, Grid, Paper, Typography} from "@mui/material";
import ExamCard from "./ExamBarAddons/ExamCard";

const boxStyle = {
	width: '95%',
	display: 'flex',
	flexDirection: "column",
	alignItems: 'center',
	height: "30%",
}

const paperStyle = {
	width: '100%',
	display: 'flex',
	flexDirection: 'row',
	overflowX: 'auto'
}

export interface exam {
	day: string,
	month: string
}

const ExamBar = () => {
	let exams: exam[] = []
	for (let i = 0; i < 32; i++) {
		exams.push({day: i.toString(), month: "sept"})
	}

	return (
		<Box sx={boxStyle}>
			<Paper sx={paperStyle} elevation={2}>
				{exams.map((exam: exam) => {
					return (
						<ExamCard key={exam.day} day={exam.day} month={exam.month}/>
					)
				})}
			</Paper>
		</Box>
	)
}

export default ExamBar
