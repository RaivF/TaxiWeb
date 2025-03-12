import React, { useState } from 'react'
import axios from 'axios'
import {
	Box,
	Typography,
	Button,
	TextField,
	Container,
	Autocomplete,
} from '@mui/material'
import { sendMessage } from '../utils/api'

const CombinedComponent = () => {
	const [from, setFrom] = useState('')
	const [to, setTo] = useState('')
	const [additional, setAdditional] = useState('')
	const [distance, setDistance] = useState<number | null>(null)
	const [price, setPrice] = useState<number | null>(null)
	const [error, setError] = useState('')
	const [citySuggestions, setCitySuggestions] = useState<string[]>([])

	const API_KEY = '5b3ce3597851110001cf624874c38fe304a74cab84a065000864d141' // Замените на ваш API-ключ от OpenRouteService

	const handleSendMessage = async () => {
		try {
			// Логика отправки сообщения
			await sendMessage(from, to, additional)
			console.log('Сообщение отправлено')
		} catch (error) {
			console.error('Ошибка при отправке сообщения:', error)
		}
	}

	const calculateDistance = async () => {
		console.log(from, to)
		if (!from || !to) {
			setError('Пожалуйста, введите оба города.')
			return
		}

		try {
			const responseA = await axios.get(
				`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${from}`
			)
			const coordsA = responseA.data.features[0].geometry.coordinates

			const responseB = await axios.get(
				`https://api.openrouteservice.org/geocode/search?api_key=${API_KEY}&text=${to}`
			)
			const coordsB = responseB.data.features[0].geometry.coordinates

			const distanceResponse = await axios.post(
				`https://api.openrouteservice.org/v2/directions/driving-car`,
				{
					coordinates: [coordsA, coordsB],
				},
				{
					headers: {
						Authorization: API_KEY,
						'Content-Type': 'application/json',
					},
				}
			)

			const calculatedDistance = (
				distanceResponse.data.routes[0].summary.distance / 1000
			).toFixed(2)
			console.log(Number(calculatedDistance))
			setDistance(Number(calculatedDistance))
			setPrice(Number(calculatedDistance) * 20)
			setError('')
		} catch (err) {
			setError('Ошибка при расчете расстояния. Проверьте введенные данные.')
			console.error(err)
		}
	}

	const fetchCitySuggestions = async (query: string) => {
		try {
			const response = await axios.get(
				`https://api.openrouteservice.org/geocode/autocomplete?api_key=${API_KEY}&text=${query}`
			)
			const suggestions: string[] = response.data.features.map(
				(feature: { properties: { label: string } }) => feature.properties.label
			)
			setCitySuggestions(suggestions)
		} catch (error) {
			console.error('Ошибка при получении подсказок:', error)
		}
	}

	const handleInputChange =
		(setter: React.Dispatch<React.SetStateAction<string>>) =>
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const value = event.target.value
			setter(value)
			if (value.length > 2) {
				fetchCitySuggestions(value)
			}
		}

	return (
		<Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
			<Container>
				<Typography variant='h3' component='h1' gutterBottom>
					Закажите междугороднее такси
				</Typography>
				<Typography variant='h5' component='h2' gutterBottom>
					Быстро, удобно, безопасно
				</Typography>
				<Box component='form' sx={{ mt: 4 }}>
					<Autocomplete
						freeSolo
						options={citySuggestions}
						onChange={i => {
							const target = i.target as HTMLElement
							setFrom(target.innerText)
						}}
						renderInput={params => (
							<TextField
								{...params}
								label='Откуда'
								variant='outlined'
								fullWidth
								value={from}
								onChange={handleInputChange(setFrom)}
								sx={{ mb: 2, bgcolor: 'white' }}
							/>
						)}
					/>
					<Autocomplete
						freeSolo
						options={citySuggestions}
						onChange={i => {
							const target = i.target as HTMLElement
							setTo(target.innerText)
						}}
						renderInput={params => (
							<TextField
								{...params}
								label='Куда'
								variant='outlined'
								fullWidth
								value={to}
								onChange={handleInputChange(setTo)}
								sx={{ mb: 2, bgcolor: 'white' }}
							/>
						)}
					/>
					<TextField
						label='Дополнительное сообщение'
						variant='outlined'
						fullWidth
						value={additional}
						onChange={e => setAdditional(e.target.value)}
						sx={{ mb: 2, bgcolor: 'white' }}
					/>
					<Button
						variant='contained'
						color='secondary'
						size='large'
						onClick={handleSendMessage}
						sx={{ mr: 2 }}
					>
						Заказать такси
					</Button>
					<Button
						variant='contained'
						color='secondary'
						size='large'
						onClick={calculateDistance}
					>
						Рассчитать цену
					</Button>
				</Box>
				{error && <Typography color='error'>{error}</Typography>}
				{distance && (
					<Typography style={{ marginTop: '20px' }}>цена {price} р</Typography>
				)}
			</Container>
		</Box>
	)
}

export default CombinedComponent
