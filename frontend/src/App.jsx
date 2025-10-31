import { Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

function Home() {
  return (
    <div style={{ maxWidth: 720, margin: '40px auto' }}>
      <h1>Campus Closet</h1>
      <p>Welcome! Please <Link to="/login">login</Link> or <Link to="/signup">create an account</Link>.</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

export default App
