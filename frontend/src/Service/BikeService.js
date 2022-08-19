import axios from "axios";
// const url= "https://restaurant-review-nand-kumar.herokuapp.com";
const url = "http://localhost:5000";



export const getBikes = async ({ page, PAGE_SIZE }) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.get(`${url}/bikes?page=${page}&pageSize=${PAGE_SIZE}`, {
            headers: { authtoken: token }
        });
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}
export const getFilteredBikes = async ({ name = "", location = "", color = "", rating = "0", fromDate = '', toDate = '', page, PAGE_SIZE }) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.get(`${url}/bikes/filtered?name=${name}&location=${location}&color=${color}&rating=${rating}&fromDate=${fromDate}&toDate=${toDate}&page=${page}&pageSize=${PAGE_SIZE}`, {
            headers: { authtoken: token }
        });
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data)
    }
}


export const addNewBike = async ({ addBikeName, addBikeColor, addBikeLocation ,addIsAvailable}) => {
    const token = localStorage.getItem('bike-user');
    try {
        const res = await axios.post(`${url}/bikes`, {
            name: addBikeName,
            color: addBikeColor,
            location: addBikeLocation,
            isAvailable:addIsAvailable,
        }, {
            headers: { authtoken: token }
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message)
    }
}

export const getUserReservations = async (userId) => {
    try {
        const res = await axios.get(`${url}/reservations?userId=${userId}`);
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message)
    }
}

export const updateReservationStatus = async ({ id }) => {
    try {
        const res = await axios.get(`${url}/reservations/${id}`);
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message)
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
        throw new Error(error.response.data.message)
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
        throw new Error(error.response.data.message)
    }
}


export const updateBike = async ({ bikeId, editedName, editedColor, editedLocation,editedIsAvailable }) => {
    const token = localStorage.getItem('bike-user');

    try {
        const res = await axios.patch(`${url}/bikes/${bikeId}`, {
            name: editedName,
            color: editedColor,
            location: editedLocation,
            isAvailable:editedIsAvailable
        }, {
            headers: { authtoken: token }
        });
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.message)
    }
}




