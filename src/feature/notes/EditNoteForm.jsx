
import { useNavigate } from 'react-router-dom'
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditNoteForm = ({note , users}) => {
  const [updateNote , {
    isLoading ,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation()
  
  
  
  const [deleteNote, {
       isSuccess : isDelSuccess,
       isError: isDelError,
       error: delerror
  }] = useDeleteNoteMutation()
  
const navigate = useNavigate()


  const[title , setTitle] = useState(note.title)
  const[text , setText] = useState(note.text)
  const [completed, setCompleted] = useState(note.completed)
  const [userId , setUserId] = useState(note.user)
  
  
  
  useEffect(() => {
    if(isSuccess || isDelSuccess){
    setTitle('')
    setText('')
    setUserId('')
    navigate('/dash/notes')
    }
  }, [isSuccess , isDelSuccess , navigate])
  const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
  const validTitleClass = !title ? "form__input--incomplete" : ''
  const validTextClass = !text ? "form__input--incomplete" : ''
  
  
  const errContent = (error?.data?.message || delerror?.data?.message) ?? ""
  
  const canSave = [title , text , userId].every(Boolean) && !isLoading
  
  
  const onSaveNoteClicked = async() => {
    if(canSave){
     await updateNote({id : note.id , user : userId ,title, text, completed })
    }
  }
  
  const onTitleChanged = (e) => setTitle(e.target.value)
   const onTextChanged = (e)  => setText(e.target.value)
   
   const onCompletedChanged = () => setCompleted(prev => !prev)
   const onUserIdChanged = e => setUserId(e.target.value)
  
  
  const onDeleteNoteClicked = async() => {
    await deleteNote({id : note.id})
  }
  
  const created = new Date(note.createdAt).toLocaleString('en-US' , {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
  const updated = new Date(note.upadtedAt).toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'})
  
  
  const options = users && users.map((user) => {
    return (
        <option key={user.id} value={user.id}>
            {user.username}
        </option>
    )
  })
  
  const content = (
    <>
    <p className={errClass}>{errContent}</p>
    
    <form className="form" onSubmit={e => e.preventDefault()}>
       <div className="form__title-row">
        <h2>Edit Note #{note.ticket}</h2>
        <div className="form__action-buttons">
            <button  className="icon-button"title="Save" onClick={onSaveNoteClicked} disabled={!canSave}>
            <FontAwesomeIcon icon={faSave} />
                
            </button>
            <button  className="icon-button" title="Delete"onClick={onDeleteNoteClicked} >
            <FontAwesomeIcon icon={faTrashCan} />
            </button>
            
            
        </div>
            
      </div>
      <label className="form__label" htmlFor="note-title">
      Title:</label>
      <input className={`form__input ${validTitleClass}`}   id="note-title" name="title" type="text"  autoComplete="off" value={title}  onChange={onTitleChanged}/>
        
        <label className="form__label"  htmlFor="note-text">Text : </label>
        <input className={`form__input form__input--text ${validTextClass}`} id='note-text' name='text' value={text} onChange={onTextChanged} />
        
        <div className="form__row">
        <div className="form__divider">
          <label className="form__label form__checkbox-container" htmlFor="note-completed">WORK COMPLETE:
          <input id='note-completed' checked={completed} className="form__checkbox" name="completed" type='checkbox'  onChange={onCompletedChanged}/>
          </label>
          
          
          
          <label className="form__label form__checkbox-container" htmlFor="note-username">
          ASSIGNED TO:</label>
          
          <select  id="note-username"  name="username" className='form__select'  value={userId}  onChange={onUserIdChanged}>
            {options}
          </select>
        
        </div>
        <div className="form__divider">
             <p className="form__created">Created:<br />{created}</p>
              <p className="form__updated">Updated:<br />{updated}</p>
        </div>
            
            
        </div>   
        
        
        
    </form>
    
    
    
    </>
  )
  
  return content
  
}

export default EditNoteForm