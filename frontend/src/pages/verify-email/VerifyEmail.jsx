import "./verify-email.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";
import { BeatLoader } from "react-spinners";

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { isEmailVerified } = useSelector(state => state.auth);
    const { userId, token } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verify = async () => {
            await dispatch(verifyEmail(userId, token));
            setLoading(false);
        };
        verify();
    }, [userId, token]);

    return (
        <section className="verify-email">
            {loading ? (
                <div className="verify-email-loading">
                    <BeatLoader color="var(--secondary-color)" />
                    <p>Verifying your email...</p>
                </div>
            ) : isEmailVerified ? (
                <>
                    <i className="bi bi-patch-check verify-email-icon"></i>
                    <h1 className="verify-email-title">
                        Great news! Your email address has been successfully verified.
                        You can now access all features of your account.
                    </h1>
                    <Link to="/login" className="verify-email-link">
                        Proceed to Login
                    </Link>
                </>
            ) : (
                <h1 className="verify-email-not-found">Not Found</h1>
            )}
        </section>
    );
}

export default VerifyEmail;
