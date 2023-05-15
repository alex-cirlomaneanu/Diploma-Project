import Footer from "../footer/Footer";
import NavBar from "../navbar/NavBar";
import MainContent from "../maincontent/MainContent";

const WebsiteLayout = ({children}) => {
    return (
        <>
            <NavBar/>
            <MainContent>
                {children}
            </MainContent>
            <Footer/>
        </>
    );
}

export default WebsiteLayout;