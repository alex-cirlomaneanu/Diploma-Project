import React from "react";
import "./Footer.css";
function Footer() {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text"><span>Home</span>BookExpress</h1>
                    <p>
                        HomeBookExpress este o platformă online de vânzare a cărților.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> &nbsp; 0740 123 456</span>
                        <span><i className="fas fa-envelope"></i> &nbsp; </span>
                    </div>
                    <div className="socials">
                        <a href="src/components/layout/footer#"><i className="fab fa-facebook"></i></a>
                        <a href="src/components/layout/footer#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <br/>
                    <ul>
                        <a href="src/components/layout/footer#"><li>Evenimente</li></a>
                        <a href="src/components/layout/footer#"><li>Termeni și condiții</li></a>
                        <a href="src/components/layout/footer#"><li>Politica de confidențialitate</li></a>
                        <a href="src/components/layout/footer#"><li>Despre noi</li></a>
                        <a href="src/components/layout/footer#"><li>Contact</li></a>
                    </ul>
                </div>
                <div className="footer-section contact-form">
                    <h2>Contactează-ne</h2>
                    <br/>
                    <form action="index.html" method="post">
                        <input type="email" name="email" className="text-input contact-input" placeholder="Adresa de email..."/>
                        <textarea rows="4" name="message" className="text-input contact-input" placeholder="Mesajul tău..."></textarea>
                        <button type="submit" className="btn btn-big contact-btn">
                            <i className="fas fa-envelope"></i>
                            Trimite
                        </button>
                    </form>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; HomeBookExpress.com | Designed by Alexandru
            </div>
        </div>

    );
}

export default Footer;