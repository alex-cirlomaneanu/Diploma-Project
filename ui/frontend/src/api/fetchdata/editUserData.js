import axios from "axios";
import { useEffect, useState} from "react";

const editUserData = (formData) => {
    let response = {};
    try {
        const url =`http://localhost:8080/api/v1/appuser/edituser`;
        response =
            axios.put(
                url,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                });
    } catch (e) {
        console.log(e);
    }

    return response;
}

export default editUserData;``