import React from 'react';
import {Image} from "react-bootstrap";
import './AboutUs.css';

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>Despre noi</h1>
            <p>
                Bun venit pe HomeBookExpress! Suntem o platformă inovatoare care îți pune la dispoziție o gamă largă de cărți pe care le poți închiria în mod convenabil și le vom livra la tine acasă. Indiferent dacă ești pasionat de literatură clasică, cărți de ficțiune contemporană sau non-ficțiune captivantă, avem o colecție bogată din care poți alege.
            </p>
            <p>
                La HomeBookExpress, ne preocupă satisfacția clienților noștri și ne străduim să oferim o experiență de închiriere simplă și fără bătăi de cap. Poți naviga prin selecția noastră de cărți, să alegi cele care te interesează și să le adaugi în coșul de închirieri. Apoi, noi ne ocupăm de restul! Echipa noastră dedicată va ambala cu grijă cărțile și le va livra la adresa ta preferată, pentru ca tu să te bucuri de lectură fără să te deplasezi.
            </p>
            <p>
                Indiferent dacă vrei să descoperi cele mai noi bestseller-uri sau să explorezi clasici literari, HomeBookExpress este partenerul tău de încredere. Avem un sistem simplu de înregistrare și autentificare, astfel încât să poți gestiona ușor închirierile și să ai acces rapid la istoricul tău de lectură.
            </p>
            <p>
                Echipa noastră este formată din pasionați de cărți și suntem aici să te ajutăm să găsești exact ceea ce cauți. Dacă ai întrebări sau nevoie de recomandări personalizate, nu ezita să ne contactezi. Suntem mereu dornici să te ajutăm să ai o experiență plăcută și să îți oferim cele mai bune cărți pentru lecturile tale preferate.
            </p>
            <p>
                Bine ai venit în lumea captivantă a cărților! HomeBookExpress îți aduce lectura direct la ușa ta!
            </p>
            <Image src="/logo1.jpg" alt="HomeBookExpress" className="logo" />
        </div>
    );
}

export default AboutUs;