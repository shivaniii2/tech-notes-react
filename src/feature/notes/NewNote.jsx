
// This component ensures that there are users present so that we can add a new note associated to a user only otherwise what is the point 


import { useSelector } from "react-redux"
import { selectAllUsers } from "../users/userApiSlice"
import NewNoteForm from "./NewNoteForm"
const NewNote = () => {
  
  
const users = useSelector(selectAllUsers)

const content = users ?  <NewNoteForm users={users} /> : <p>Loading...</p>
return content
 
}

export default NewNote