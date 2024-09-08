import { createEntityAdapter , createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const noteAdapter = createEntityAdapter({});
const initialState = noteAdapter.getInitialState();

// injectEndpoints  : a method provided by RTK Query to add or modify API endpoints in an existing API slice.
export const notesApiSlice =  apiSlice.injectEndpoints({ // notesApiSlice represents an enhanced API slice that includes the getNotes endpoint.
    endpoints: builder =>({     
        getNotes: builder.query({  // getNotes is an endpoint here for performing a GET request
            query : () => '/notes',
            validateStatus : (response  , result) =>{
                return response.status === 200 && !result.isError
            },
            transformResponse : (responseData) => {
                const loadedNotes = responseData.map((note) =>{
                    note.id = note._id
                    return note
                })
               return noteAdapter.setAll(initialState , loadedNotes)
               //
            },
            providesTags : (result ,err , arg) =>{
                // result is a normalized state object containing ids and entities, created by createEntityAdapter.
                if(result?.ids){
                    return [
                        {type : 'Note' , id : 'LIST'},
                        ...result.ids.map( id => ({type  : 'Note' , id }) )
                    ]
                    // This array of tags will look something like this : 
                    // [
                    //     { type: 'Note', id: 'LIST' },
                    //     { type: 'Note', id: 123 },
                    //     { type: 'Note', id: 456 },
                    //     { type: 'Note', id: 789 }
                    // ]
                    // { type: 'Note', id: 'LIST' }: Represents the entire list of notes.
                    //  { type: 'Note', id }: Represents individual notes.
                    
                }else {
                    return {type :'Note' , id : 'LIST'}
                }
            }
            
        })
    })
})

export const {useGetNotesQuery} = notesApiSlice
// useGetNotesQuery - atomatically generated hook from an endpoint.
// As soon as the component(using this hook) mounts (renders for the first time), useGetNotesQuery will automatically make an API request to fetch notes.


export const selectNotesResults = notesApiSlice.endpoints.getNotes.select()

// The select() method is provided by RTK Query and is available on each endpoint. It creates a selector function that can be used to extract the result of the getNotes query from the Redux store.
// It works like selectors work in react that is they are used to access the data in components from a redux store.
// selectNotesResult is a selector function that allows you to manually access the query's result (and its state) from the Redux store.



const selectNotesData = createSelector(
    selectNotesResults,
    noteResult => noteResult.data
    
)


export const {selectAll : selectAllNotes, selectById : selectNotesById,selectIds : selectNoteIds} = noteAdapter.getSelectors(state => selectNotesData(state) ?? initialState)



// noteAdapter.getSelectors(state => selectNoteData(state) ?? initialState) 
// As we know createEntityAdapter provides several pre-built selectors for interacting with normalized state and noteAdapter is an instance of that only.getSelectors is a method provided by entityAdapter that generates selectors based on the normalized state structure.
// state => selectNoteData(state)  : This function uses the selectNotesData selector to retrieve the normalized notes data from the Redux state.
// ?? initialState:

// This is a fallback mechanism. If selectNotesData(state) returns undefined or null, initialState is used as a default value.
// initialState is the initial state defined for the notesAdapter, ensuring that your selectors always have a valid state to work with.

//selectAll:
// Renamed to selectAllNotes with selectAllNotes. This selector returns an array of all entities in the normalized state.
// selectById:
// Renamed to selectNoteById with selectNoteById. This selector takes an ID and returns the entity with that ID.
// selectIds:
// Renamed to selectNoteIds with selectNoteIds. This selector returns an array of all entity IDs.

