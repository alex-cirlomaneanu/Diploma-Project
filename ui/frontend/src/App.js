import './App.css';
import Login from "./componenets/login/Login";
import Register from "./componenets/register/Register";
import NavBar from "./componenets/Navbar/NavBar"
import Header from "./componenets/Header"
import Footer from "./componenets/footer/Footer"
import {Route, Routes, Link, useNavigate} from 'react-router-dom';
import HomePage from "./componenets/homepage/HomePage";
import Layout from "./componenets/layout/Layout";

function App() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    }

    const handleRegister = () => {
        navigate('/register');
    }

    return (
        <>
            <NavBar/>

            <Routes>
                {/*<Layout>*/}
                {/*<Route path={'/'} element={<Layout/>}/>*/}
                <Route index element={<HomePage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                {/*</Layout>*/}
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
