import { useState } from 'react'
import { Box, Typography, Button, TextField, Container } from '@mui/material'
import axios from 'axios'

const Banner = () => {
	// Состояния для хранения значений полей ввода
	const [from, setFrom] = useState('')
	const [to, setTo] = useState('')
	const [additional, setAdditional] = useState('')

	// Функция для отправки данных на сервер
	const sendMessage = async () => {
		const data = {
			from: from,
			to: to,
			additional: additional,
		}

		try {
			const response = await axios.post('http://38.180.160.26:3000/message', data)
			console.log('Ответ от сервера:', response.data)
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	const getChatId = async () => {
		const url =
			'https://api.telegram.org/bot7673196064:AAGoAJFZpKnb63QDhkC_pcxrnT7Q3RYG858/getUpdates'

		try {
			const response = await axios.post(url)
			console.log('Ответ от Telegram:', response.data)

			// Извлекаем chat_id из ответа
			if (response.data.ok && response.data.result.length > 0) {
				const chatId = response.data.result[0].message.chat.id
				console.log('Ваш chat_id:', chatId)
			} else {
				console.log('Нет новых сообщений или обновлений.')
			}
		} catch (error) {
			console.error('Ошибка:', error)
		}
	}

	getChatId()

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
					{/* Поле "Откуда" */}
					<TextField
						label='Откуда'
						variant='outlined'
						fullWidth
						value={from}
						onChange={e => setFrom(e.target.value)}
						sx={{ mb: 2, bgcolor: 'white' }}
					/>
					{/* Поле "Куда" */}
					<TextField
						label='Куда'
						variant='outlined'
						fullWidth
						value={to}
						onChange={e => setTo(e.target.value)}
						sx={{ mb: 2, bgcolor: 'white' }}
					/>
					{/* Дополнительное поле для сообщения */}
					<TextField
						label='Дополнительное сообщение'
						variant='outlined'
						fullWidth
						value={additional}
						onChange={e => setAdditional(e.target.value)}
						sx={{ mb: 2, bgcolor: 'white' }}
					/>
					{/* Кнопка для отправки сообщения */}
					<Button
						variant='contained'
						color='secondary'
						size='large'
						onClick={sendMessage}
					>
						Заказать такси
					</Button>
				</Box>
			</Container>
		</Box>
	)
}

export default Banner
