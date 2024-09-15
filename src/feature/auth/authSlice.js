import { createSlice } from "@reduxjs/toolkit";
// The createSlice function simplifies the process of defining Redux reducers and actions.


const authSlice = createSlice({
    name : "auth",
    initialState : {accessToken : null},
    reducers : {
        setCredentials : (state, action) => {
            const {accessToken} = action.payload
            state.token = accessToken
        },
        logOut : (state , action) => {
            state.token = null
        }
    }
})


export const {setCredentials , logOut } = authSlice.actions // This exports the two action creators: setCredentials and logOut. These actions can be dispatched in your application to update the auth state.
export default authSlice.reducer // This exports the reducer function, which will be added to the Redux store under the auth key. It defines how the auth state changes in response to actions.
export const selectCurrentToken = (state) => state.auth.token
// This is a selector function that allows you to extract the current authentication token from the Redux state. You can use this selector in your components to access the token, for example, to check if a user is logged in.


// The reason you don't have a userSlice or notesSlice in your current setup is because you're relying on RTK Query for managing your users and notes data, which eliminates the need for manually managing slices for those entities. RTK Query simplifies state management for data fetching and caching by automatically creating reducers and middleware based on your API slice.
// In contrast, the authSlice is manually defined because authentication data (like tokens) is typically managed locally and doesn't require fetching or caching from an external API. Since RTK Query is focused on managing server-side data, manually creating slices like authSlice helps manage client-side state separately.
// So, you don't need a userSlice or notesSlice because usersApiSlice and notesApiSlice already handle the logic for fetching, caching, and storing user and note data in your Redux store.





