import React, { useEffect } from 'react';
import './Sample.css';

const Sample = () => {
    const rgbValues = { r: 187, g: 200, b: 100 };
    useEffect(() => {
        const sendColorsToBackend = () => {
            fetch('http://localhost:5000/daltonize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(rgbValues), // Replace with your desired RGB values
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        };

        sendColorsToBackend();
    }, []); // Empty dependency array means this effect runs once after the initial render

    return (
        <div className="styled-page">
            <div> (187, 200, 100)</div>
            <header className="header">
                <h1 className="header-title">Welcome to My Stylish Page</h1>
                <p className="header-subtitle">This is a beautifully styled React component.</p>
            </header>

            <section className="content">
                <h2 className="content-title">About This Page</h2>
                <p className="content-text">
                    This page demonstrates a simple yet elegant layout using React and CSS. Each element has been carefully styled to provide a visually appealing experience.
                </p>

                <ul className="content-list">
                    <li className="list-item">Custom fonts and colors</li>
                    <li className="list-item">Responsive design</li>
                    <li className="list-item">Accessible and user-friendly</li>
                </ul>

                <form className="form">
                    <label className="form-label" htmlFor="name">Your Name:</label>
                    <input className="form-input" type="text" id="name" placeholder="Enter your name" />

                    <label className="form-label" htmlFor="message">Your Message:</label>
                    <textarea className="form-textarea" id="message" placeholder="Enter your message"></textarea>

                    <button className="form-button">Submit</button>
                </form>
            </section>

            <footer className="footer">
                <p className="footer-text">© 2024 My Stylish Page. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Sample;
