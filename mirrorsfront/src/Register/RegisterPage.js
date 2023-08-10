import React, { useState, useEffect } from "react";
import Select from "react-select";
import "./RegisterPage.css";
import axios from "axios";

const RegisterPage = () => {
    const [form, setForm] = useState({
        userType: "",
        companyName: "",
        fullName: "",
        country: null,
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Opportunities don't happen. You create them. - Chris Grosser",
        "Don't confuse having a career with having a life. – Hillary Clinton.",
        "Be so good they can't ignore you.” – Steve Martin.",
        "Pleasure in the job puts perfection in the work. – Aristotle",
        "Choose a job you love, and you will never have to work a day in your life. —Confucius",
        "Work to become, not to acquire. —Elbert Hubbard"
        // Add more quotes as needed
    ];

    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [quotes.length]);

    useEffect(() => {
        setIsPasswordValid(form.password && form.confirmPassword && form.password === form.confirmPassword);
    }, [form.password, form.confirmPassword]);

    const userTypeOptions = [
        { value: "applicant", label: "Applicant" },
        { value: "company", label: "Company" },
    ];
    const countryOptions = [
        { value: "IL", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/il.svg`} alt="Israel Flag" className="flag-icon" /> Israel</> },
        { value: "US", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/us.svg`} alt="USA Flag" className="flag-icon" /> United States</> },
        { value: "GB", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg`} alt="UK Flag" className="flag-icon" /> United Kingdom</> },
        { value: "CA", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/ca.svg`} alt="Canada Flag" className="flag-icon" /> Canada</> },
        { value: "AU", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/au.svg`} alt="Australia Flag" className="flag-icon" /> Australia</> },
        { value: "IN", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/in.svg`} alt="India Flag" className="flag-icon" /> India</> },
        { value: "CN", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/cn.svg`} alt="China Flag" className="flag-icon" /> China</> },
        { value: "JP", label: <><img src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/jp.svg`} alt="Japan Flag" className="flag-icon" /> Japan</> },
        ];
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleCountryChange = (option) => {
        setForm({ ...form, country: option.value });
    };

    const handleUserTypeChange = (option) => {
        setForm({ ...form, userType: option.value, companyName: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isPasswordValid || !form.fullName || !form.country || !form.email || (form.userType === "company" && !form.companyName)) {
            // Handle validation error
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/loginRouter/register', form);

            // Handle the response
            if (response.status === 200) {
                alert("Registration successful!");
                // You can reset the form or navigate the user to another page
            } else {
                alert(response.data.error || "There was an error with the registration");
            }
        } catch (error) {
            alert("There was an error connecting to the server. Please try again later.");
        }
    };

    return (
        <div className="register-container">
            <div className="welcome-box">
                <h1>Welcome</h1>
                <p className="world-of-mirrors">To The World Of Mirrors</p>
                <p className="subtitle">You are about to take off your career level way up to the sky</p>
                <div className="quote-container"> {/* Fixed this line */}
                    {quotes.map((quote, index) => (
                        <p
                            key={index}
                            className={`quote ${currentQuoteIndex === index ? "active" : ""}`}
                        >
                            {quote}
                        </p>
                    ))}
                </div>
            </div>
            <div className="register-box">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <Select
                        className="user-type-select"
                        options={userTypeOptions}
                        onChange={handleUserTypeChange}
                        placeholder="Select User Type"
                    />
                    {form.userType === "company" && (
                        <input type="text" name="companyName" placeholder="Company Name" required onChange={handleChange} />
                    )}
                    <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} />
                    <Select
                        className="country-select"
                        options={countryOptions}
                        onChange={handleCountryChange}
                        placeholder="Select Country"
                    />
                    <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
                    <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange} />
                    <button type="submit" disabled={!isPasswordValid || !form.fullName || !form.country || !form.email || (form.userType === "company" && !form.companyName)}>
                        Register
                    </button>
                    {!isPasswordValid && <p className="error">Passwords must match!</p>}
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;