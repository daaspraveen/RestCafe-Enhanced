import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import Login from './pages/Login'
import ProtectedRoute from './ProtectedRoute.js'
import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Home />{' '}
          </ProtectedRoute>
        }
      />
      <Route
        path='/cart'
        element={
          <ProtectedRoute>
            <Cart />{' '}
          </ProtectedRoute>
        }
      />
      <Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/not-found' replace />} />
    </Routes>
  </BrowserRouter>
)

export default App
