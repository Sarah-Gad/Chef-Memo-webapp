import { ChefHat, X, Menu } from 'lucide-react';

const HeaderLeft = ({ toggle, setToggle}) => {
    return (
        <div className="header-left">
            <div className="header-logo">
                <strong>Chef Memo</strong>
                <ChefHat size={26} />
            </div>
            <div onClick={() => setToggle(prev => !prev)} className="header-menu">
            {toggle ? <X size={35} className="menu-icon" /> : <Menu size={35} className="menu-icon" />}
            </div>
        </div>
    );
}

export default HeaderLeft;
