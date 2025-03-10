import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material'

const Header = () => {
	return (
		<AppBar position='static'>
			<Container>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Такси Город
					</Typography>
					<Button color='inherit'>Заказать такси</Button>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Header
