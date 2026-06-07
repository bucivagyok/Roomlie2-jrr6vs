import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoomPage from './pages/RoomPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ReservationsPage from './pages/ReservationsPage';

export function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<RoomPage />}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/reservations' element={<ReservationsPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App