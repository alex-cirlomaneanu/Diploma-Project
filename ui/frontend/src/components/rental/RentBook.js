import axios from "axios";
import { useState } from "react";
import { Toast } from "react-bootstrap";

const handleRental = async (bookTitle, email) => {
    try {
        const url = "http://localhost:8080/api/v1/rentals/rent-book";
        const response = await axios.post(
            url,
            {
                bookTitle: bookTitle,
                userEmail: email
            },
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('token')
                }
            }
        );
        console.log(response.data);
    } catch (error) {
        console.error(error.response);

        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data); // Custom error message from the backend
            console.log(error.response.status); // Status code
            // Display error message using toast or any other UI component
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    }
}

export default handleRental;