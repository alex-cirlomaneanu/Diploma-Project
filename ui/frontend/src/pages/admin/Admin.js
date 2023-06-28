import React from 'react';
import {Button} from "react-bootstrap";
import "./Admin.css";

const Admin = () => {
    return (
        <div>
            <h1>Admin</h1>
            <Button className="admin-button" href="/admin/allusers">Utilizatori</Button>
            <Button className="admin-button" href="/admin/allbooks">Cărți</Button>
            <Button className="admin-button" href="/admin/allgenres">Genuri</Button>
            <Button className="admin-button" href="/admin/allauthors">Autori</Button>
            <Button className="admin-button" href="/admin/allrentals">Împrumuturi</Button>
        </div>
    )
}

export default Admin;