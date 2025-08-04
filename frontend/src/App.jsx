import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Footer from './components/Footer'
import CartPage from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import ProductDetail from './pages/ProductDetail'
import Login from './pages/Login'
import AccountPage from './pages/Account'
import Loader from './components/Loader'

// Hot Toast
import { Toaster } from 'react-hot-toast'

const App = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {/* Hot Toast */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '15px'
          },
          duration: 3000
        }}
      />

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/main-product' element={<ProductDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/account' element={<AccountPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
