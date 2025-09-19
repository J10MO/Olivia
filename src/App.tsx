import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./Auth/AuthContext"
// import PrivateRoute from "./routes/PrivateRoute"
// import Login from "./pages/Login"
// import Dashboard from "./pages/Dashboard"

// import "./App.css"
import BeautyShopApp from "./pages/Dashboard"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
      =
            <Route path="/" element={<BeautyShopApp />} />
 =
          
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
