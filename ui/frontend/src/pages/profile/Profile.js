import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from "../../components/auth/Auth";
import './Profile.css';
import {Button} from "react-bootstrap";
import BookCarousel from "../../components/bookcarousel/BookCarousel";
import getEmail from "../../api/fetchdata/getEmail";
import getUserData from "../../api/fetchdata/getUserData";
import getUserBooks from "../../api/fetchdata/getUserBooks";
import EditProfileModal from "../../components/editprofilemodal/EditProfileModal";
import getDate from "../../components/calendardate/calendardate";
import DeleteProfileModal from "../../components/deleteprofilemodal/DeleteProfileModal";
import UserRentals from "../../components/userrentalsmodal/UserRentals";
import ChangePasswordModal from "../../components/changepasswordmodal/ChangePasswordModal";

function Profile() {
    const authContext = useContext(AuthContext);
    const user = getUserData(localStorage.getItem('userEmail'));
    const userBooks = getUserBooks(localStorage.getItem('userEmail'));
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showRentalsModal, setShowRentalsModal] = useState(false);

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowEditModal = () => setShowEditModal(true);

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const handleCloseChangePasswordModal = () => setShowChangePasswordModal(false);
    const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);

    const handleCloseRentalsModal = () => setShowRentalsModal(false);
    const handleShowRentalsModal = () => setShowRentalsModal(true);


    if (!authContext.authenticated) {
        authContext.navigate("/login");
    }

    return (
        <div className={"profile"}>
            <div className="personal-info">
                <EditProfileModal
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    user={user}
                />
                <DeleteProfileModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    authContext={authContext}
                    userId={user.userId}
                />
                <UserRentals
                    show={showRentalsModal}
                    handleClose={handleCloseRentalsModal}
                    userId={user.userId}
                />
                <ChangePasswordModal
                    show={showChangePasswordModal}
                    handleClose={handleCloseChangePasswordModal}
                    userId={user.userId}
                />
                <h1>Profil</h1>
                <br/>
                {/*<h2>Informații personale</h2>*/}
                <p>Prenume: {user.firstname}</p>
                <p>Nume: {user.lastname}</p>
                <p>Email: {user.email}</p>
                <p>Număr de telefon: {user.phoneNumber}</p>
                <p>Data nașterii: {getDate(user.birthDate)}</p>
                {/*<h1>Adresa</h1>*/}
                <p>Adresă de livrare: ---</p>
                {/*<h2>Comenzi</h2>*/}
                {/*<p>Comenzi: {user.orders}</p>*/}
            </div>
            <div className={"book-history"}>
                <h1>Istoric comenzi</h1>
                <br/>
                {
                    (userBooks.length === 0) ? (
                        <p>Nu ai comandat nicio carte încă.</p>
                        ) : (
                        <div className="book-caorusel-container">
                            <BookCarousel books={userBooks}/>
                        </div>
                    )
                }
            </div>
            <div className={"buttons"}>
                <h1>Acțiuni profil</h1>
                <Button variant="primary" onClick={() => handleShowEditModal()}>Editează profil</Button>
                <br/>
                <Button variant="primary" onClick={() => handleShowChangePasswordModal()}>Schimbă
                    parola</Button>
                <br/>
                <Button variant="secondary" onClick={() => handleShowRentalsModal()}>Comenzile mele</Button>
                <br/>
                <Button variant="danger" onClick={() => handleShowDeleteModal()}>Șterge profil</Button>
            </div>
        </div>
    );
}

export default Profile;