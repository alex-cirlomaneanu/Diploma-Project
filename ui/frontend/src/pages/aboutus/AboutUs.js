import React from 'react';
import {Image} from "react-bootstrap";

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>Despre noi</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam
                ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec euismod, nisl
                vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae nisl. Donec
                euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae
                nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl
                nisl vitae nisl. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae
                aliquam nisl nisl vitae nisl.
            </p>
            <Image src="/logo1.jpg" alt="HomeBookExpress" className="logo" />
        </div>
    );
}

export default AboutUs;