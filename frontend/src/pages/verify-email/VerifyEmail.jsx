import "./verify-email.css"
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    const isEmailVerified = true;
    return (
        <section className="verify-email">
            {isEmailVerified ? (
            <>
            <i className="bi bi-patch-check verify-email-icon"></i>
            <h1 className="verfiy-email-title">
                Great news! Your email address has been successfully verified.
                You can now access all features of your account.
            </h1>
            <Link to="/login" className="verify-email-link">
                Proceed to Login
            </Link>
            </>
        ) : (
            <>
            <h1 className="verify-email-not-found">Verification Failed</h1>
            </>
        )}
        </section>
        );
}

export default VerifyEmail;
