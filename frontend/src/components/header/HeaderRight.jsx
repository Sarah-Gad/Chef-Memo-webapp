import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UserRoundPlus, LogOut } from 'lucide-react';
import { useState } from "react";

const HeaderRight = () => {
    const { user } = useSelector(state => state.auth);
    const [dropdown, setDropdown] = useState(false);
    return (
        <div className="header-right">
            {user ?
            <>
            <div className="header-right-user-info">
                <span onClick={() => setDropdown(prev => !prev)} className="header-right-username">
                    {user?.username}
                </span>
                <img src={user?.profilePhoto.url}
                alt="user photo"
                className="header-right-user-photo"
                />
                {dropdown && (
                    <div className="header-right-dropdown">
                    <Link  onClick={() => setDropdown(false)} to={`/profile/${user?._id}`} className="header-dropdown-item" >
                    <i className="bi bi-file-person"></i>
                    <span>Profile</span>
                    </Link>
                    <div className="header-dropdown-item">
                        <i className="bi bi-box-arrow-in-left">
                            <span>Logout</span>
                        </i>
                    </div>
                </div>
                )}
            </div>
            </> : (
                <>
                <Link to="/login" className="header-right-link">
                    <LogOut size={20} />
                    <span>Login</span>
                </Link>
                <Link to="/register" className="header-right-link">
                    <UserRoundPlus size={20} />
                    <span>Register</span>
                </Link>
                </>
            )
            }
            </div>
        );
    }

export default HeaderRight;
