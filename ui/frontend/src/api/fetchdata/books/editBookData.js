import axios from "axios";

const editBookData = (formData) => {
    console.log("Edit book data: ", formData);
    let response = {};
    try {
        console.log("Edit book data: ", formData)
        const url =`http://localhost:8080/api/v1/book/updatebook`;
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

export default editBookData;``