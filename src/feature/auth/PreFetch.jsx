import { useEffect } from "react"
import { store } from '../../app/store';
import { notesApiSlice } from "../notes/notesApiSlice";
import { Outlet } from "react-router-dom";
import { usersApiSlice } from "../users/userApiSlice";

const PreFetch = () => {
    
    useEffect(()=>{
        console.log("i am working bro")
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        
        
        return() =>{
            notes.unsubscribe()
            users.unsubscribe()
            
        }
    },[])
    
    
    
return <Outlet/>
}

export default PreFetch


// The Prefetch component is used for pre-fetching data before it is needed. This is often done to ensure that data is loaded in advance and available when a user navigates to a component that requires it. 
// Essentially, it ensures that data is available in the Redux store before the user actually needs it.


//You must be thinking that why do we need those automatically built hooks out of endpoints as data fetching is already done through preFetch component  But even with pre-fetching, you need the useGetNotesQuery hook in your components to access the data, handle loading states, and manage errors. It also ensures that the component re-renders when the data changes.

// In your App.js, when the Prefetch component is used, it triggers fetching of notes and users data early. This means that by the time a user navigates to a route that requires notes data, it’s already in the store.

// Component Use: In NotesList, you still use useGetNotesQuery to retrieve and display the data. This hook handles the state management specific to the NotesList component, such as displaying a loading spinner or error message if necessary.
