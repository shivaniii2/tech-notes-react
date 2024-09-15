import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from '../feature/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth : authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

// RTK Query supports automatic refetching of data when certain events occur, such as when a user logs in or a token refreshes. By calling setupListeners(store.dispatch), it configures RTK Query to listen for specific Redux actions that trigger refetches or updates.

// Dispatch Function: store.dispatch is passed as an argument to setupListeners. This dispatch function is used to send actions to the Redux store.
// Listeners: setupListeners sets up internal listeners to the Redux store's dispatch function. These listeners look out for specific actions related to RTK Query's lifecycle, such as api/ending or api/failed actions.
// Automatic Refetching and Cache Management: Based on these actions, RTK Query can automatically refetch data, update cache, or trigger other side effects.




// authReducer: This is the reducer function from your authSlice, which is responsible for handling actions like setCredentials and logOut. It updates the auth state (e.g., setting and removing the authentication token).

// auth: This is the key in your global Redux store state where the authReducer will manage its slice of the state. Essentially, all state managed by authReducer will live under state.auth.When actions like setCredentials or logOut are dispatched, the authReducer will update the auth slice of the state.

