import { Box, Typography, Container } from '@mui/material'

const Footer = () => {
	return (
		<Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
			<Container>
				<Typography variant='h6' gutterBottom>
					Такси Город
				</Typography>
				<Typography variant='body2'>
					© 2025 Такси Город. Все права защищены.
				</Typography>
			</Container>
		</Box>
	)
}

export default Footer
