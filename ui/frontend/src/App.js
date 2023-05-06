import './App.css';
import Login from "./componenets/auth/Login";
import Register from "./componenets/auth/Register";
import {Route, Routes, Link} from 'react-router-dom';

function App() {
    return (
        <div>
            <h1>Welcome to HomeBookExpress</h1>
            <div>
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </div>

            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
            </Routes>
        </div>
    );
}

export default App;
