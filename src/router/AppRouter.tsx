import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Content, MainContainer } from './styled.AppRouter'
import { MainPage } from '../app/pages/Main/Main'

// массив страниц приложения и их путей
const ArrAsideElement = [{ path: '/', title: 'main', element: <MainPage /> }]

const AppRouter: React.FC = () => {
	return (
		<MainContainer>
			<Content>
				<Routes>
					{ArrAsideElement.map((e, index) => (
						<Route key={index} path={e.path} element={e.element} />
					))}
					{/* route для обработки несуществующих маршрутов */}
					{/* <Route path="*" element={<Page404 />} /> */}
				</Routes>
			</Content>
		</MainContainer>
	)
}

export default React.memo(AppRouter)
