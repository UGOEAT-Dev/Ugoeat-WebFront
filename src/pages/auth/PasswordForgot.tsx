import { Link } from "react-router-dom"

function PasswordForgot()
{
    return (
        <main>
            <p>Password Forgot</p>

            <Link to='/auth/reset-password'>Password Reset</Link>
        </main>
    )
}

export default PasswordForgot