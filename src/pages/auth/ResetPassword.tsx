import { Link } from "react-router-dom"

function ResetPassword()
{
    return (
        <main>
            <p>Reset Password</p>
            <Link to='/auth/forgot-password'>Forgot Password</Link>
        </main>
    )
}

export default ResetPassword