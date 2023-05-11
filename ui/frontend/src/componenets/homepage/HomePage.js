import React from "react";
import "./HomePage.css";
import WebsiteLayout from "../layout/websitelayout/WebsiteLayout";

const HomePage = () => {
    return (
        <WebsiteLayout className="home-page">
            <h1>Home Page</h1>
            <>
                <section>
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo mi vel dui posuere, ut suscipit mauris lacinia.</p>
                </section>
                <section>
                    <h2>Services</h2>
                    <ul>
                        <li>Web Development</li>
                        <li>Graphic Design</li>
                        <li>Mobile App Development</li>
                    </ul>
                </section>
                <section>
                    <h2>Contact</h2>
                    <p>Email: info@example.com</p>
                    <p>Phone: 123-456-7890</p>
                </section>
            </>
        </WebsiteLayout>
    );
};

export default HomePage;