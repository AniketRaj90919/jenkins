import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8000/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        password: form.password,
                    }),
                }
            );

            const data = await response.json();

            alert(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    const styles = {
        container: {
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f5f7fb",
        },
        card: {
            width: "100%",
            maxWidth: "400px",
            background: "#fff",
            padding: "32px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
        input: {
            width: "100%",
            padding: "12px",
            marginBottom: "14px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxSizing: "border-box",
        },
        button: {
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
        },
        text: {
            textAlign: "center",
            marginTop: "16px",
        },
        link: {
            color: "#1976d2",
            textDecoration: "none",
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.card} onSubmit={handleSubmit}>
                <h2>Signup</h2>

                <input
                    style={styles.input}
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <input
                    style={styles.input}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <button style={styles.button}>Signup</button>

                <p style={styles.text}>
                    Already have an account?{" "}
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}