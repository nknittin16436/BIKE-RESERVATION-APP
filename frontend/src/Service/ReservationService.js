import axios from "axios";
// const url= "https://restaurant-review-nand-kumar.herokuapp.com";
const url = "http://localhost:5000";



export const getReservations = async () => {
    const token =localStorage.getItem('bike-user');
    try {
        const res = await axios.get(`${url}/reservations`,{
            headers:{authtoken:token}
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

export const createBikeReservation = async ({ bikeId, fromDate, toDate, userId }) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.post(`${url}/reservations`, {
            bikeId, fromDate, toDate, userId
        }, {
            headers: { authtoken: token }
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

export const getUserReservations = async (userId) => {
    const token =localStorage.getItem('bike-user');

    try {
        const res = await axios.get(`${url}/reservations/user?userId=${userId}`,{
            headers:{authtoken:token}
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

export const getBikeReservations = async (bikeId) => {
    try {
        const res = await axios.get(`${url}/reservations/bike?bikeId=${bikeId}`);
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
    const token = localStorage.getItem('bike-user');
    try {
        const res = await axios.get(`${url}/reservations/${id}`, {
            headers: { authtoken: token }
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


export const updateReservationRating = async ({ id, rating }) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.post(`${url}/reservations/${id}`, {
            rating: rating
        }, {
            headers: { authtoken: token }
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




