import { UserRoundPlus, LogOut } from 'lucide-react';

const HeaderRight = () => {
return (
    <div className="header-right">
            <button className="header-right-link">
                <LogOut size={20} />
                <span>Login</span>
            </button>
            <button className="header-right-link">
                <UserRoundPlus size={20} />
                <span>Register</span>
            </button>
        </div>
    );
}

export default HeaderRight;
