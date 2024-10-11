import { House, CookingPot, BookHeart, CircleUserRound } from 'lucide-react';
const Navbar = ({toggle, setToggle}) => {
return (
    <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)"}} className="navbar">
            <ul className="nav-links">
                <li onClick={() => setToggle(false)} className="nav-link">
                    <House size={26} className="nav-icon" /> Home
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <CookingPot size={26} className="nav-icon" /> Recipes
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <BookHeart size={26} className="nav-icon" /> Share Your Recipe
                </li>
                <li onClick={() => setToggle(false)} className="nav-link">
                    <CircleUserRound size={26} className="nav-icon" /> Admin Dashboard
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
