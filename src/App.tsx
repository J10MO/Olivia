import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthContext";
import { AppProvider } from "./Context/AppContext";
import Layout from "./components/Layout/AppContainer";
import BeautyShopApp from "./pages/Dashboard";
import CartPage from "./pages/Bage/Index";
import AccountPage from "./pages/Acount/Index";
// import "./App.css";

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<BeautyShopApp />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/account" element={<AccountPage />} />
              {/* Add more routes here as needed */}
            </Routes>
          </Layout>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;