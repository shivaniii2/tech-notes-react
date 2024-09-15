
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setCredentials } from '../../feature/auth/authSlice'


const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:3500' ,
        credentials :'include',
        prepareHeaders : (headers, {getState}) => {
            const token = getState().auth.token
            if(token ){
                headers.append('authorization' , `Bearer ${token}`)
            }
            
            return headers
        }
    })



const baseQueryWithReauth = async(args , api , extraOptions) => {
    debugger
      // console.log(args) // request url, method, body
     // console.log(api) // signal, dispatch, getState()
     let result = await baseQuery(args , api , extraOptions)
     
     if(result?.error?.status === 403){
        console.log('sending refresh token')
        const refreshedToken = await api.dispatch(apiSlice.endpoints.refresh.initiate())
        
        
        if(refreshedToken?.data){
            api.dispatch(setCredentials({...refreshedToken.data}))
            result = await baseQuery(args,api , extraOptions)
        }else{
            if(refreshedToken?.error?.status === 403){
                refreshedToken.error.data.message = "Your login has expired.";
            }
            return refreshedToken
        }
        
     }
     return result;
    
}


export const apiSlice = createApi({
    baseQuery : baseQueryWithReauth ,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})




// fetchBaseQuery : This is a lightweight wrapper around the fetch API, designed to be used with Redux Toolkit Query. It handles making HTTP requests.
// credentials: 'include': Ensures that cookies are sent with cross-origin requests.
// prepareHeaders : This function prepares the request headers before sending them. It checks for an authentication token (auth.token) from the Redux state:
// If a token exists, it adds an Authorization header: Bearer <token>, allowing the user to authenticate requests.





// baseQueryWithReauth : This function wraps around the basic baseQuery to handle token expiration and automatic re-authentication.
// args : This refers to the arguments (or input) that are passed when you make an API call. Typically, args contains details such as the endpoint URL, HTTP method, body of the request, and any other query-specific data.

// The api object provides access to several useful functions and pieces of state from the Redux store. It helps manage things like dispatching actions or accessing the current state within your API request logic.


// This baseQuery is essentially a function that gets returned by fetchBaseQuery. So later, when you call baseQuery with the arguments like args, api, and extraOptions, you're actually calling the function returned by fetchBaseQuery.
// fetchBaseQuery is a built-in function from RTK Query that helps simplify making HTTP requests. It returns a function that you can call with arguments like the request details (args), the Redux API helpers (api), and other custom options (extraOptions).

