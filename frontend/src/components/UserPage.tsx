import {Avatar, Button, Card, CardActions, CardContent, CardHeader, Link, Typography} from "@mui/material";
import {useEffect, useState} from "react";

const UserPage = () => {
	useState()

	useEffect(() => {

	},[])

	return (
		<div>
			<Card sx = {{ maxWidth: 345}}>
				<CardHeader
					avatar={
						<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"/>
					}
					title={"login"}
					subheader={"email"}
				/>
				<CardActions>
					<Button href={"google.com"}> Intranet Profile </Button>
				</CardActions>
			</Card>
		</div>
	)
}

export default UserPage
