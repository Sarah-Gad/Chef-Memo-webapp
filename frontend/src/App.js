import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home"
import Login from "./pages/forms/Login"
import Register from "./pages/forms/Register"
import RecipesPage from "./pages/recipes-page/RecipesPage"
import CreateRecipe from "./pages/create-recipe/CreateRecipe"
import Footer from "./components/footer/Footer";
import RecipeDetails from "./pages/recipe-details/RecipeDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category";
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from './pages/forms/ResetPassword';
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector(state => state.auth);

  return (
    <BrowserRouter>
    <ToastContainer position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={ !user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={ !user ? <Register /> : <Navigate to="/" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/recipes" element={<RecipesPage />} />
        <Route path="/recipes/create-recipe" element={ user ? <CreateRecipe /> : <Navigate to="/" />} />
        <Route path="/recipes/details/:id" element={<RecipeDetails />} />
        <Route path="/recipes/categories/:category" element={<Category />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
