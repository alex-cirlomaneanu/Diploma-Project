import axios from "axios";
import { useEffect, useState} from "react";

const deleteUserData = (userId) => {
    let response = {};
    try {
        const url = `http://localhost:8080/api/v1/appuser/deleteuser?userId=${userId}`;
        response =
            axios.delete(
                url,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
    } catch (e) {
        console.log(e);
    }

    return response;
}

export default deleteUserData;