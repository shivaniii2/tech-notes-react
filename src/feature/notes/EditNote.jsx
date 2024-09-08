import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectNotesById } from "./notesApiSlice"
import { selectAllUsers } from "../users/userApiSlice"
import EditNoteForm from "./EditNoteForm"


const EditNote = () => {
  debugger
  const {id} = useParams()
  const note = useSelector(state => selectNotesById(state , id))
  const users = useSelector(selectAllUsers)
  const content = note && users ? <EditNoteForm note={note} users={users}/> : <p>Loading...</p>
  
 return content
}

export default EditNote