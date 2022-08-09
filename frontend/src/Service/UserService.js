import axios from "axios";
// const url= "https://restaurant-review-nand-kumar.herokuapp.com";
const url= "http://localhost:5000";



export const registerUser = async ({ name, email, password, confirmPassword }) => {
    try {
        const res = await axios.post(`${url}/users/signup`, {
            name: name,
            email: email,
            password: password,
            confirmPassword:confirmPassword
        });
        // console.log(res);
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


export const loginUser = async ({email, password}) => {

    // console.log(loginEmail, loginPassword);
    try {
        const res = await axios.post(`${url}/users/login`, {
            email: email,
            password: password,
        });
        console.log(res);
        if (res.status === 200) {

            return { accessToken: res.data.accessToken, success: true };
        }
        else {
            const err = new Error("Invalid Email or password");
            err.status = false;
            throw err;
        }
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = async () => {
    const token = localStorage.getItem('restaurant-user');
    try {
        const res = await axios.get(`${url}/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(res);
        return res.data;
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
        throw new Error("Invalid access token");
    }
}


export const deleteUser = async (id) => {
    const token = localStorage.getItem('restaurant-user');

    try {
        const res = await axios.delete(`${url}/660/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {

            return { success: true };
        }
    } catch (error) {
        throw new Error(error.response.data);
    }
}


export const editUser = async (id, name, email, role) => {
    const token = localStorage.getItem('restaurant-user');

    try {
        // console.log(id);
        const res = await axios.patch(`${url}/660/users/${id}`, {
            name: name,
            email: email,
            role: role,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
            return { success: true };
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data);
    }
}

export const getUser = async (id) => {
    const token = localStorage.getItem('restaurant-user');

    try {
        // console.log(id);
        const res = await axios.get(`${url}/660/users/${id}`,{
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.status === 200) {
            const data = res.data;
            delete data['password'];
            return { success: true, user: data };
        }
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data);

    }
}