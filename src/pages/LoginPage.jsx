import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/LoginPage.module.css";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "", scope: '1' });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Correct the URL to use http://localhost:4001
            const response = await axios.post("http://35.173.201.89/api/v1/login", credentials);
            const { scope } = response.data.data;
            console.log(response.data.data.accessToken)
            // Save user details and token in localStorage
            localStorage.setItem("accessToken", response.data.data.accessToken);

            if (scope === '1') {
                console.log(scope)
                navigate("/dashboard"); // Redirect to admin dashboard
            } else {
                alert("Access Denied: You are not an admin.");
                setError("Unauthorized access.");
            }
        } catch (err) {
            setError("Invalid username or password.");
        }
    };


    return (
        <div className={styles.container}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleLogin}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
