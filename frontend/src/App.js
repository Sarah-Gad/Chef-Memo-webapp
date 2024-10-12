import { BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/header/Header";
import Home from "./pages/home/Home"
import Login from "./pages/forms/Login"
import Register from "./pages/forms/Register"
import RecipesPage from "./pages/recipes-page/RecipesPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CreateRecipe from "./pages/create-recipe/CreateRecipe"
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create-recipe" element={<CreateRecipe />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
