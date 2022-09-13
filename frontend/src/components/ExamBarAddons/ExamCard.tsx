import {Paper, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";
import {exam} from "../ExamBar";
import {text} from "stream/consumers";



const ExamCard = (props:exam) => {
	return (
		<Paper sx={{
			my: 1,
			mx: 1,
			py: 1.5,
			px: 3,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}
			   elevation={3}
		>
			<Typography component='div' variant={'h5'}>
				{props.day}
			</Typography>
			<Typography component='div' variant='subtitle1' color="text.secondary">
				{props.month}
			</Typography>
		</Paper>
	)
}

export default ExamCard
