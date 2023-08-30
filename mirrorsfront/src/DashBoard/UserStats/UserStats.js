import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserStats.css';

function UserStats() {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Ideally, you would have your API endpoint here
        axios.get('/api/user/data')
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.log("Error fetching user data:", error);
            });
    }, []);

    // A utility function to render lists nicely
    function renderList(list) {
        return list.map((item, index) => (
            <li key={index}>{item}</li>
        ));
    }

    return (
        <div className="stats-container">
            <section className="section events-section">
                <h2>Events</h2>
                <ul>
                    {userData.events && userData.events.map((event, index) => (
                        <li key={index}>
                            <strong>{event.title}</strong> on {event.date}: {event.description}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="section collabs-section">
                <h2>Collaborations</h2>
                <ul>{userData.collabs && renderList(userData.collabs)}</ul>
            </section>

            <section className="section awards-section">
                <h2>Awards</h2>
                <ul>{userData.awards && renderList(userData.awards)}</ul>
            </section>

            <section className="section testimonials-section">
                <h2>Testimonials</h2>
                <ul>
                    {userData.testimonials && userData.testimonials.map((testimonial, index) => (
                        <li key={index}>
                            <blockquote>{testimonial.quote}</blockquote>
                            <cite>{testimonial.author}</cite>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="section skills-section">
                <h2>Skills</h2>
                <ul>{userData.skills && renderList(userData.skills)}</ul>
            </section>

            <section className="section">
                <h2>Contact</h2>
                <ul>
                    <li>Email: {userData.email}</li>
                    <li>Phone: {userData.phone}</li>
                </ul>
            </section>

            <section className="section">
                <h2>About Me</h2>
                <p>{userData.aboutMe}</p>
            </section>

            <section className="section">
                <h2>Gallery</h2>
                {userData.galleryImages && userData.galleryImages.length > 0
                    ? (
                        <div className="gallery">
                            {userData.galleryImages.map((imgSrc, index) => (
                                <img key={index} src={imgSrc} alt={`Gallery ${index}`} />
                            ))}
                        </div>
                    )
                    : (<p>No images available.</p>)
                }
            </section>
        </div>
    );
}

export default UserStats;
