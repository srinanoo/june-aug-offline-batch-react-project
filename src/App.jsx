import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LayoutPage from './pages/LayoutPage'
import TraineesPage from './pages/Trainees/TraineesPage'
import TraineesAddPage from './pages/Trainees/TraineesAdd'
import TraineesEditPage from './pages/Trainees/TraineesEdit'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutPage />}>
            <Route index element={<HomePage />}></Route>

            <Route path='/trainees' element={<TraineesPage />}></Route>
            <Route path='/trainees/add' element={<TraineesAddPage />}></Route>
            <Route path='/trainees/edit/:id' element={<TraineesEditPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
