import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
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