import { apiSlice } from '../../app/api/apiSlice';
import { logOut } from './authSlice';


const authApiSlice = apiSlice.injectEndpoints({
    endpoints : builder => ({  
        login : builder.mutation ({
            query : credentials => ({
                url : '/auth',
                method: 'POST',
                body : {...credentials}
                
            })
            
        }) 
        ,
        sendLogout : builder.mutation({
            query : () => ({
                url : '/auth/logout',
                method : 'POST'
                
            }),
            async onQueryStarted (arg , {dispatch , queryFulfilled}) {
                 try {
                    const data = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                 } catch(error) {
                    console.log(error);
                    
                 }
                
            }
                
        
        }),
        
        refresh : builder.mutation({
            query : () => ({
                url : 'auth/refresh',
                method : 'GET'
            })
        })
        
    })
})



export const {useLoginMutation , useSendLogoutMutation , useRefreshMutation}   = authApiSlice






// Notes :


// In the context of RTK Query, builder is an object that provides methods to define endpoints in your API slice. When you use builder.query or builder.mutation, you are essentially telling RTK Query how your API should behave—whether it should perform data fetching (query) or modify data (mutation).


// query : This is where you specify the details of the request, like the url (/auth), the HTTP method (POST), and the request body (credentials).


// onQueryStarted: This is an optional side-effect that runs when the mutation is initiated.
// Once the logout request is successfully fulfilled (await queryFulfilled), two things happen:
// The logOut action (from authSlice) is dispatched, which clears the token from the Redux state.
// The apiSlice.util.resetApiState() is dispatched, which resets all RTK Query cache state (like invalidating cached data).
