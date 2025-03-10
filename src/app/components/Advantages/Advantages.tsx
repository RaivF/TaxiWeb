import { Box, Typography, Grid, Container } from '@mui/material'
import { CheckCircle, LocalTaxi, Security } from '@mui/icons-material'

const Advantages = () => {
	const advantages = [
		{
			icon: <CheckCircle fontSize='large' />,
			title: 'Надежность',
			description: 'Мы гарантируем безопасность и комфорт',
		},
		{
			icon: <LocalTaxi fontSize='large' />,
			title: 'Удобство',
			description: 'Закажите такси в несколько кликов',
		},
		{
			icon: <Security fontSize='large' />,
			title: 'Безопасность',
			description: 'Все водители проходят проверку',
		},
	]

	return (
		<Container sx={{ bgcolor: 'white', py: 8 }}>
			<Grid container spacing={4}>
				{advantages.map((advantage, index) => (
					<Grid item xs={12} md={4} key={index}>
						<Box textAlign='center'>
							<Box sx={{ color: 'primary.main', mb: 2 }}>{advantage.icon}</Box>
							<Typography variant='h5' gutterBottom>
								{advantage.title}
							</Typography>
							<Typography>{advantage.description}</Typography>
						</Box>
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default Advantages
