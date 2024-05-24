import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

function App() {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book-details" element={<DetailPage />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
