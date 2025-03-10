import {
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Container,
} from '@mui/material'

const Tariffs = () => {
	const tariffs = [
		{ from: 'Москва', to: 'Санкт-Петербург', price: '5000 руб.' },
		{ from: 'Москва', to: 'Казань', price: '7000 руб.' },
		{ from: 'Москва', to: 'Сочи', price: '10000 руб.' },
	]

	return (
		<Container sx={{ bgcolor: 'primary.main', py: 8 }}>
			<Typography variant='h4' gutterBottom>
				Тарифы
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Откуда</TableCell>
							<TableCell>Куда</TableCell>
							<TableCell>Цена</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tariffs.map((tariff, index) => (
							<TableRow key={index}>
								<TableCell>{tariff.from}</TableCell>
								<TableCell>{tariff.to}</TableCell>
								<TableCell>{tariff.price}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	)
}

export default Tariffs
