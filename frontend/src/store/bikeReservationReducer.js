

import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    loading: false,
    users: [],
    isAuthenticated: false,
    isManager: false,
    loggedInUser: {},
    page: 1,
    isDateFilterAdded:false,
    reservations:[],
    totalBikes:0,
    filterMode:false

};

export const bikeReservationReducer = createReducer(initialState, {

    restaurants: (state, action) => {
        state.restaurants = action.payload
    },
    loading: (state,) => {
        state.loading = !state.loading
    },
    reviews: (state, action) => {
        state.reviews = action.payload
    },
    highlightedReviews: (state, action) => {
        state.highlightedReviews = action.payload
    },
    allUsers: (state, action) => {
        state.users = action.payload
    },
    filterBook: (state, action) => {
        state.filterBookFetch = true
        state.filterBookArgs = action.payload
        state.page = 1
    },
    isAuthenticated: (state, action) => {
        state.isAuthenticated = action.payload
    },
    isManager: (state, action) => {
        state.isManager = action.payload
    },
    isDateFilterAdded: (state, action) => {
        state.isDateFilterAdded = action.payload
    },
    loggedInUser: (state, action) => {
        state.loggedInUser = action.payload
    },
    reservations: (state, action) => {
        state.reservations = action.payload
    },
    totalBikes: (state, action) => {
        state.totalBikes = action.payload
    },
    filterMode: (state, action) => {
        state.filterMode = action.payload
    },
})