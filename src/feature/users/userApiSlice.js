import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()
// injectEndpoints  : a method provided by RTK Query to add or modify API endpoints in an existing API slice.
export const usersApiSlice = apiSlice.injectEndpoints({// userApiSlice represents an enhanced API slice that includes the getUsers endpoint.
    endpoints: builder => ({
        getUsers: builder.query({// getUsers is an endpoint here for performing a GET request
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                // result is a normalized state object containing ids and entities, created by createEntityAdapter.
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                      // This array of tags will look something like this : 
                    // [
                    //     { type: 'User', id: 'LIST' },
                    //     { type: 'User', id: 123 },
                    //     { type: 'User', id: 456 },
                    //     { type: 'User', id: 789 }
                    // ]
                    // { type: 'User', id: 'LIST' }: Represents the entire list of users.
                    //  { type: 'User', id }: Represents individual users.
                    
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        
        addNewUser : builder.mutation({
            query : initialUserData => ({
                url : '/users',
                method:'POST',
                body : {
                    ...initialUserData
                }
            }),
            invalidatesTags : [
                {type: 'User' , id : "LIST"}
            ]
        }),
        updateUser : builder.mutation ({
            query : initialUserData => ({
                url : '/users',
                method : 'PATCH',
                body : {
                    ...initialUserData
                }
                
                
                
            }),
            invalidatesTags : (result , error , arg) => [ { type: 'User' , id: arg.id}]
                
            
            
        }) ,
        deleteUser  : builder.mutation({
            query : ({id}) => ({
                url : '/users',
                method : 'DELETE',
                body : { id }
                
            }),
            invalidatesTags: (result , error , arg) => [
                {type : "User" , id: arg.id}
            ]
        })
    }),
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
    
} = usersApiSlice

// useGetUsersQuery - atomatically generated hook from an endpoint.
// useEndpointnameQuery/Mutation : depends on type of query.
// As soon as the component(using this hook) mounts (renders for the first time), useGetUsersQuery will automatically make an API request to fetch users.

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

// The select() method is provided by RTK Query and is available on each endpoint. It creates a selector function that can be used to extract the result of the getUsers query from the Redux store.
// It works like selectors work in react that is they are used to access the data in components from a redux store.
// selectUsersResult is a selector function that allows you to manually access the query's result (and its state) from the Redux store.

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data 
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)



// userAdapter.getSelectors(state => selectUserData(state) ?? initialState) 
// As we know createEntityAdapter provides several pre-built selectors for interacting with normalized state and userAdapter is an instance of that only.getSelectors is a method provided by entityAdapter that generates selectors based on the normalized state structure.
// state => selectUserData(state)  : This function uses the selectUsersData selector to retrieve the normalized users data from the Redux state.
// ?? initialState:

// This is a fallback mechanism. If selectUsersData(state) returns undefined or null, initialState is used as a default value.
// initialState is the initial state defined for the usersAdapter, ensuring that your selectors always have a valid state to work with.

//selectAll:
// Renamed to selectAllUsers with selectAllUsers. This selector returns an array of all entities in the normalized state.
// selectById:
// Renamed to selectUserById with selectUserById. This selector takes an ID and returns the entity with that ID.
// selectIds:
// Renamed to selectUserIds with selectUserIds. This selector returns an array of all entity IDs.




// createEntityAdapter - to work or manage normalised state.
