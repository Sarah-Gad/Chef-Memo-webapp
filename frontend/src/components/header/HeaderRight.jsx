import { Link } from "react-router-dom"
import { UserRoundPlus, LogOut } from 'lucide-react';

const HeaderRight = () => {
return (
    <div className="header-right">
            <Link to="/login" className="header-right-link">
                <LogOut size={20} />
                <span>Login</span>
            </Link>
            <Link to="/register" className="header-right-link">
                <UserRoundPlus size={20} />
                <span>Register</span>
            </Link>
        </div>
    );
}

export default HeaderRight;
