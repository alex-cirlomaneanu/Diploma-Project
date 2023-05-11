import './App.css';
import Login from "./componenets/login/Login";
import Register from "./componenets/register/Register";
import NavBar from "./componenets/layout/navbar/NavBar"
import Header from "./componenets/Header"
import Footer from "./componenets/layout/footer/Footer"
import {Route, Routes, Link, useNavigate} from 'react-router-dom';
import HomePage from "./componenets/homepage/HomePage";

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
            {/*<NavBar/>*/}

            <Routes>
                {/*<Layout>*/}
                {/*<Route path={'/'} element={<Layout/>}/>*/}
                <Route index element={<HomePage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                {/*</Layout>*/}
            </Routes>
            {/*<Footer/>*/}
        </>
    );
}

export default App;
