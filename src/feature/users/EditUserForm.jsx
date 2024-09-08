import { useNavigate } from "react-router-dom"
import { useUpdateUserMutation } from "./userApiSlice"
import { useDeleteUserMutation } from "./userApiSlice"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Roles } from '../../config.js/roles';

const USER_REGEX = /^[A-z]{3-20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const EditUserForm = ({user}) => {
    const [updateUser, {
        isLoading ,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()
    
    const [deleteUser, {
        isSuccess :isDelSuccess ,
        isError : isDelError,
        error : delerror
        
    }] = useDeleteUserMutation()
    
    
    const navigate = useNavigate()
    const [userName , setUserName] = useState(user.username)
    const [password , setPassword] = useState('');
    const [roles , setRoles] = useState(user.roles)
    const [active , setActive] = useState(user.active)
    const [ validUsername, setValidUsername] = useState(false)
    const [ validPasword, setValidPassword] = useState(false)
    
    useEffect(()=> {
        setValidPassword(PWD_REGEX.test(password))
       
    } ,[password])
    
    useEffect(()=> {
        setValidUsername(USER_REGEX.test(userName))
       
    } ,[userName])
    
    
    useEffect (()=> {
       if(isDelSuccess || isSuccess)   {
        setUserName('')
        setPassword('')
        setRoles([])
        navigate('/dash/users')
       } 
    }, [isDelSuccess, isSuccess , navigate ])
    
    
    let canSave ;
    
    if(password){
        canSave = [roles.length, validPasword,validUsername].every(Boolean) && !isLoading
    }else{
        canSave = [roles.length , validUsername].every(Boolean) && !isLoading
    }
    // every(Boolean), which returns true only if every element in the array is truthy.

    
    const onSaveUserClick  = async() =>{
        if(password){
            await updateUser({id : user.id ,password,roles,active})
        }else{
            await updateUser({id : user.id ,roles,active})
        }
        
    }
    
    const onUsernameChanged = (e) => setUserName(e.target.value)
    const onPasswordChanged = (e) => setPassword(e.target.value)
    const onActiveChanged = () => setActive(prev =>  !prev)
    
    
    const onDeleteUserClicked = async() =>{
         await deleteUser({id : user.id})
        
    }
    
    const onRolesChanged  = e => {
        const values  =  Array.from (
            e.target.selectOptions, //  Use `selectedOptions` to get the selected options
            (option) => option.value  // Map each option to its value
        )
        setRoles(values)
        
    }
    
     
    const errClass = (isError || isDelError )? 'errmsg' : "offscreen"
    const errContent  = (error?.data?.message || delerror?.data?.message) ?? ''

    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
     const validPwdClass = password && !validPasword ? 'form__input--incomplete' : ''
    
     const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


     
     
     const options = Object.values(Roles).map(role => {
        return (
            <option 
            key={role}
            value={role}
            >
            {role}    
            </option>
        )
     })
    const content = (
        
        <>
        <p className={errClass}>{errContent}</p>
        <form className="form" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
            <h2>Edit User</h2>
            <div className="form__action-buttons">
                <button className="icon-button" title="save" onClick={onSaveUserClick} disabled ={!canSave}> 
                <FontAwesomeIcon icon={faSave} />
                    
                </button>
                
                <button className="icon-button"  title="Delete" onClick={onDeleteUserClicked}>
                <FontAwesomeIcon icon={faTrashCan} />
                    
                </button>
                
                
                </div>
                
            </div>
            
            <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                    
                    <input className={`form__input ${validUserClass}`}
                    
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={userName}
                    onChange={onUsernameChanged}
                    
                    
                    
                    />
                    <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input    
                
                
                className={`form__input ${validPwdClass}`}
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={onPasswordChanged}
                
                
                
                />
                
                
                <label className="form__label form__checkbox-container" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>
                
                
                <label className="form__label" htmlFor="roles">
                ASSIGNED ROLES:</label>
                
                <select
                
                id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                
                >
                    {options}
                 </select>
                   
            
        </form>
        
        
        </>
        
        
    )
    
    
    return content
    
    
    
    
    
    
    

}

export default EditUserForm