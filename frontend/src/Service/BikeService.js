import axios from "axios";
// const url= "https://restaurant-review-nand-kumar.herokuapp.com";
const url = "http://localhost:5000";



export const getBikes = async () => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.get(`${url}/bikes`, {
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


export const addNewBike = async ({ addBikeName, addBikeColor, addBikeLocation }) => {
    const token = localStorage.getItem('bike-user');
    try {
        const res = await axios.post(`${url}/bikes`, {
            name: addBikeName,
            color: addBikeColor,
            location: addBikeLocation
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
    try {
        const res = await axios.get(`${url}/reservations?userId=${userId}`);
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


export const deleteBike = async (id) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.delete(`${url}/bikes/${id}`, {
            headers: { authtoken: token }
        });
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}


export const updateBike = async ({ bikeId, editedName, editedColor, editedLocation }) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.patch(`${url}/bikes/${bikeId}`, {
            name: editedName,
            color: editedColor,
            location: editedLocation
        }, {
            headers: { authtoken: token }
        });
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}




