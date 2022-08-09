import axios from "axios";
// const url= "https://restaurant-review-nand-kumar.herokuapp.com";
const url = "http://localhost:5000";



export const getReservations = async () => {
    try {
        const res = await axios.get(`${url}/reservations`);
        console.log(res);

        return res.data;
        if (res.status === 201) {
            return { success: true };
        }
        else {
            return { success: false }
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}

export const updateReservationStatus = async ({ id }) => {
    try {
        const res = await axios.get(`${url}/reservations/${id}`);
        console.log(res);

        return res.data;
        if (res.status === 201) {
            return { success: true };
        }
        else {
            return { success: false }
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}


export const updateReservationRating = async ({ id, rating }) => {
    try {
        const res = await axios.post(`${url}/reservations/${id}`, {
            rating: rating
        });
        console.log(res);

        return res.data;
        if (res.status === 201) {
            return { success: true };
        }
        else {
            return { success: false }
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}




