import axios from 'axios'

// Функция для отправки данных на сервер
export const sendMessage = async (
	from: string,
	to: string,
	additional: string
) => {
	const data = {
		from: from,
		to: to,
		additional: additional,
	}

	try {
		const response = await axios.post('http://38.180.160.26:3000/message', data)
		console.log('Ответ от сервера:', response.data)
		return response.data
	} catch (error) {
		console.error('Ошибка:', error)
		throw error
	}
}

// Функция для получения chat_id из Telegram
