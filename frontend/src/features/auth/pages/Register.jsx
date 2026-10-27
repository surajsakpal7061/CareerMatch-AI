import { useState } from "react";
import "../auth.form.scss"
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";


const Register = () => {

    const { isLoading, handleRegister } = useAuth()

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please enter your email and password.");
            return;
        }

        await handleRegister({ username, email, password })

        navigate("/")

        if (isLoading) {
            return (<main><h1>Loading........</h1></main>)
        }

    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-logo">R</div>

                    <p>Register your account to continue</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="username">UserName</label>
                        <input
                            id="username"
                            type="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <div className="password-input">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={
                                    showPassword ? "Hide password" : "Show password"
                                }
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                    </div>

                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>

                <div className="divider">
                    <span>OR</span>
                </div>

                <p className="signup-text">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
