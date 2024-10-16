import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { UserRoundPlus, LogOut } from 'lucide-react';
import { useState } from "react";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const HeaderRight = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const [dropdown, setDropdown] = useState(false);

    const logoutHandler = () => {
        setDropdown(false);
        dispatch(logoutUser());
    }

    const toggleDropdown = () => setDropdown(prev => !prev);

    return (
        <div className="header-right">
            {user ?
            <>
            <div className="header-right-user-info">
                <span onClick={toggleDropdown} className="header-right-username">
                    {user?.username}
                </span>
                <img
                    src={user?.profilePhoto.url}
                    alt="user photo"
                    className="header-right-user-photo"
                    onClick={toggleDropdown}
                    style={{ cursor: 'pointer' }}
                />
                {dropdown && (
                    <div className="header-right-dropdown">
                        <Link onClick={() => setDropdown(false)} to={`/profile/${user?._id}`} className="header-dropdown-item">
                            <i className="bi bi-file-person"></i>
                            <span>Profile</span>
                        </Link>
                        <div onClick={logoutHandler} className="header-dropdown-item">
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
                    <LogOut />
                    <span className="header-right-link-text">Login</span>
                </Link>
                <Link to="/register" className="header-right-link">
                    <UserRoundPlus />
                    <span className="header-right-link-text">Register</span>
                </Link>
                </>
            )
            }
        </div>
    );
}

export default HeaderRight;
