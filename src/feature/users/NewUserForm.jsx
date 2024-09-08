import { useAddNewUserMutation } from "./userApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROLES } from "../../config/roles"


const USER_REGEX =  /^[A-z]{3,20}$/
// Its a regex for username that forces string between A to z that can be 3 to 20 characters long
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/


const NewUserForm = () => {
  
  const [ addNewUser , {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewUserMutation()
  // so addNewUser is the actual function that will trigger useAddNewUserMutation for a request to backend.
  
  const navigate = useNavigate()
  
  
  
  
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [roles, setRoles] = useState(["Employee"])
  
  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
}, [username])

useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
}, [password])

useEffect(() => {
    if (isSuccess) {
        setUsername('')
        setPassword('')
        setRoles([])
        navigate('/dash/users')
    }
}, [isSuccess, navigate])
  
  
const onUsernameChanged = e => setUsername(e.target.value)
const onPasswordChanged = e => setPassword(e.target.value)

const onRolesChanged = (e) => {
  const value = Array.from(e.target.selectedOptions , (option) => option.value)
  setRoles(value)
}
// Here e.target.selectedOptions gives an array-like object containing all the options that have been selected by the user.Array.from() is a method that converts array-like objects (such as e.target.selectedOptions) into a true array.
// It can take two arguments : The first argument is the array-like object you want to convert into an array. In your case, it’s e.target.selectedOptions. and Mapping function (optional): The second argument is a mapping function that is applied to each element of the array-like object. This function transforms each element before the array is created.
    
    

const onSaveUserClicked = async(e) => {
  e.preventDefault()
  if(canSave){
  await addNewUser({username , password , roles})
  }
}

const options = Object.values(ROLES).map((role)=> {
 return(
 <option key={role} value={role}>
    {role}
  </option>
 )
})

const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

const errClass = isError ? "errmsg" : "offscreen"
const validUserClass = !validUsername ? 'form__input--incomplete' : ''
const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
// !Boolean(roles.length) : If there are roles selected (roles.length > 0), this will evaluate to true.
// If no roles are selected (roles.length === 0), this will evaluate to false.
const errContent  = (error?.data?.message) ?? ''
// Nullish coalescing (??): The ?? operator provides a fallback value only if the result of the previous expression is null or undefined.

const content = (
  <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={onSaveUserClicked}>
                <div className="form__title-row">
                    <h2>New User</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

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

export default NewUserForm