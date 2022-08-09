import { configureStore } from "@reduxjs/toolkit";
import { bikeReservationReducer } from "./bikeReservationReducer";


const store = configureStore({
    reducer: {
        bikeReservation: bikeReservationReducer,
    }
});

export default store;