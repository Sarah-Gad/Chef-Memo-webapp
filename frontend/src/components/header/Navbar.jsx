import { Link } from "react-router-dom"
import { House, CookingPot, BookHeart } from 'lucide-react';
import { useSelector } from "react-redux";

const Navbar = ({toggle, setToggle}) => {
    const { user } = useSelector(state => state.auth);

    return (
        <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} className="navbar">
                <ul className="nav-links">
                    <Link to="/" onClick={() => setToggle(false)} className="nav-link">
                        <House size={26} className="nav-icon" /> Home
                    </Link>
                    <Link to="/recipes" onClick={() => setToggle(false)} className="nav-link">
                        <CookingPot size={26} className="nav-icon" /> Recipes
                    </Link>
                    {
                        user && (
                            <Link to="/recipes/create-recipe" onClick={() => setToggle(false)} className="nav-link">
                            <BookHeart size={26} className="nav-icon" /> Share Your Recipe
                            </Link>
                        )
                    }
                </ul>
            </nav>
        );
    }

export default Navbar;
