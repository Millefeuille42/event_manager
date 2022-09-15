import {AlertColor, Snackbar} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface snackProps {
	open: boolean | false
	message: string | ""
	severity: AlertColor | "error"
}

interface props {
	data: snackProps
	onClose: Function
}

const StatusSnack = (props:props) => {
	const handleClose = () => {
		props.onClose()
	}
	const vertical = "bottom"
	const horizontal = "center"

	return (
		<Snackbar
			open={props.data.open}
			autoHideDuration={2000}
			onClose={handleClose}
			anchorOrigin={{vertical, horizontal}}
		>
			<Alert severity={props.data.severity}>
				{props.data.message}
			</Alert>
		</Snackbar>
	)
}

export default StatusSnack
