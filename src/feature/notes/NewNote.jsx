
// This component ensures that there are users present so that we can add a new note associated to a user only otherwise what is the point 


import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/userApiSlice"
import NewNoteForm from "./NewNoteForm"
const NewNote = () => {
  
  
const users = useSelector(selectAllUsers)
if (!users?.length) return <p>Not Currently Available</p>
 const content = <NewNoteForm users={users} /> 
return content
 
}

export default NewNote