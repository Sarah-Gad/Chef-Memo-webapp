import { Link } from "react-router-dom"
import { ChefHat, X, Menu } from 'lucide-react';

const HeaderLeft = ({ toggle, setToggle }) => {
    return (
        <div className="header-left">
            <Link to="/" className="header-logo">
                <strong>Chef Memo</strong>
                <ChefHat className="chefhatlogo" size={26} />
            </Link>
            <div onClick={() => setToggle(prev => !prev)} className="header-menu">
            {toggle ? <X size={35} className="menu-icon" /> : <Menu size={35} className="menu-icon" />}
            </div>
        </div>
    );
};

export default HeaderLeft;
